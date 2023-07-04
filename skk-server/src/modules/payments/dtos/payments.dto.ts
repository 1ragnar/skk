import { IsNumber, IsString } from 'class-validator';
import { Ticket } from 'src/typeorm';

export class PaymentDTO {
  @IsNumber()
  readonly amount: number;

  readonly ticket: Ticket;
}

export class UpdatePaymentStatusDTO {
  readonly ticket: Ticket;
  readonly status: 'cancel' | 'approved';
}

export class DeletePaymentDTO {
  readonly ticket: Ticket;
}
