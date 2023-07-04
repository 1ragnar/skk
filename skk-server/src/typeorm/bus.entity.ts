import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Route } from './route.entity';
import { Seat } from './seat.entity';

@Entity({ name: 'buses' })
export class Bus {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'bus_id',
  })
  id: number;

  @Column({
    nullable: false,
    type: 'bigint',
  })
  bus_number: number;

  @Column({
    nullable: false,
  })
  capacity: number;

  @OneToMany(() => Seat, (seat) => seat.bus)
  seats: Seat[];

  @ManyToMany(() => Route, (route) => route.buses)
  routes: Route[];
}
