import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsService } from 'src/modules/payments/services/payments.service';
import { SeatsService } from 'src/modules/seats/services/seats.service';
import { Ticket } from 'src/typeorm';
import { Repository } from 'typeorm';
import {
  BuyTicketDTO,
  CancelTicketDTO,
  GetUserTicketsDTO,
} from '../dtos/ticket.dto';
import { transformTicketsData } from '../helpers/helper';
import * as moment from 'moment';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly paymentsService: PaymentsService,
    private readonly seatsService: SeatsService,
  ) {}

  async buy(data: BuyTicketDTO) {
    try {
      const ticket = new Ticket();
      ticket.seat = data.seat;
      ticket.user = data.user;
      ticket.ticket_date = new Date();
      ticket.status = 'approved';
      const newTicket = await this.ticketRepository.save(ticket);

      if (!newTicket) {
        throw new HttpException(
          'Error occured while creating ticket',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      await this.seatsService.updateSeat({
        id: newTicket.seat.id,
        is_available: false,
      });

      const newPayment = await this.paymentsService.create({
        amount: 1,
        ticket: newTicket,
      });
      if (!newPayment) {
        throw new HttpException(
          'Error occured while creating payment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return { newTicket, newPayment };
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserTickets(data: GetUserTicketsDTO) {
    const tickets = await this.ticketRepository.find({
      where: {
        user: { id: data.id },
        status: 'approved',
      },
      relations: ['seat', 'seat.route', 'seat.bus'],
    });

    let transformedTickets = transformTicketsData(tickets);
    return transformedTickets;
  }

  async cancelPurchaseTicket(data: CancelTicketDTO) {
    let ticket = await this.ticketRepository.findOne({
      where: {
        id: data.id,
      },
      relations: ['seat', 'seat.route'],
    });
    const futureDate = moment().add(1, 'hour');

    const isDateSmallerThanOneHourAhead = moment(
      ticket.seat.route.departure_time,
    ).isBefore(futureDate, 'hour');

    if (isDateSmallerThanOneHourAhead) {
      throw new HttpException(
        'Time to cancel ticket pass! You can only cancel ticket 1 hour before!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    // ticket.status = 'cancel';
    await this.seatsService.updateSeat({
      id: ticket.seat.id,
      is_available: true,
    });
    // I should use this approach but I figure out too late that I need to change relations in database and change most of my getters and setters
    // I understand that is not the best practice to delete payment and ticket, but I'm getting constraint error that I can only fix by changing relations
    // await this.paymentsService.updateStatus({ ticket, status: 'cancel' });
    // await this.ticketRepository.save(ticket);

    await this.paymentsService.delete({ ticket });
    await this.ticketRepository.delete(ticket);

    return { deleted: true };
  }
}
