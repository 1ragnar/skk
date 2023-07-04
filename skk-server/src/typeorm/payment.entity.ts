import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'ticket' })
  ticket: Ticket;

  @Column()
  amount: number;

  @Column()
  payment_date: Date;

  @Column()
  status: 'cancel' | 'approved';
}
