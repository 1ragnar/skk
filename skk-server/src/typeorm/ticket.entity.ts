import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seat } from './seat.entity';
import { User } from './user.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'ticket_id',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToOne(() => Seat)
  @JoinColumn({ name: 'seat' })
  seat: Seat;

  @Column()
  ticket_date: Date;

  @Column()
  status: 'cancel' | 'approved';
}
