import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { Bus } from './bus.entity';
import { Route } from './route.entity';

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'seat_id',
  })
  id: number;

  @ManyToOne(() => Bus, (bus) => bus.seats)
  @JoinColumn({ name: 'bus' })
  bus: Bus;

  @ManyToOne(() => Route, (route) => route.seats)
  @JoinColumn({ name: 'route' })
  route: Route;

  @OneToOne(() => Ticket)
  tickets: Ticket;

  @Column()
  seat_number: number;

  @Column()
  is_available: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ticket_price: number;
}
