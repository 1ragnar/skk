import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  BuyTicketDTO,
  CancelTicketDTO,
  GetUserTicketsDTO,
} from '../dtos/ticket.dto';
import { TicketsService } from '../services/tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @HttpCode(201)
  @Post('/buy')
  async onBuy(@Body() ticketDTO: BuyTicketDTO) {
    try {
      const res = await this.ticketService.buy(ticketDTO);
      return res;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/user/:id')
  getUserTickets(@Param('id', ParseIntPipe) id: GetUserTicketsDTO) {
    try {
      return this.ticketService.findUserTickets(id);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/cancel')
  async onCancelTicket(@Body() ticketDTO: CancelTicketDTO) {
    try {
      const res = await this.ticketService.cancelPurchaseTicket(ticketDTO);
      return res;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
