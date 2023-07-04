import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm';
import { Repository } from 'typeorm';
import {
  UpdatePaymentStatusDTO,
  PaymentDTO,
  DeletePaymentDTO,
} from '../dtos/payments.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(data: PaymentDTO) {
    try {
      const payment = new Payment();
      payment.amount = data.amount;
      payment.ticket = data.ticket;
      payment.payment_date = new Date();
      payment.status = 'approved';
      const newPayment = await this.paymentRepository.save(payment);

      return newPayment;
    } catch (e) {
      throw new HttpException(
        'An error occured while creating payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(data: UpdatePaymentStatusDTO) {
    try {
      let paymentToUpdate = await this.paymentRepository.findOneBy({
        ticket: { id: data.ticket.id },
      });

      if (!paymentToUpdate) {
        throw new HttpException(
          'There is no such payment',
          HttpStatus.BAD_REQUEST,
        );
      }

      paymentToUpdate.status = data.status;
      let updatedPayment = await this.paymentRepository.save(paymentToUpdate);

      return { payment: updatedPayment };
    } catch (e) {
      throw new HttpException(
        'An error occured while updating payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(data: DeletePaymentDTO) {
    try {
      let deletedPayment = await this.paymentRepository.delete({
        ticket: data.ticket,
      });

      return deletedPayment;
    } catch (e) {
      throw new HttpException(
        'An error occured while deleting payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
