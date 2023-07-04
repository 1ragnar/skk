import { IsNumber } from 'class-validator';
import { Seat, User } from 'src/typeorm';

export class BuyTicketDTO {
  readonly seat: Seat;

  readonly user: User;
}

export class GetUserTicketsDTO {
  @IsNumber()
  readonly id: number;
}

export class CancelTicketDTO {
  @IsNumber()
  readonly id: number;
}
