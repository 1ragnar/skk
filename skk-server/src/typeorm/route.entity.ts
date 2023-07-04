import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bus } from './bus.entity';
import { Seat } from './seat.entity';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'route_id',
  })
  id: number;

  @OneToMany(() => Seat, (seat) => seat.route)
  seats: Seat[];

  @ManyToMany(() => Bus, (bus) => bus.routes)
  @JoinTable({
    name: 'buses_routes',
    joinColumn: {
      name: 'bus',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'route',
      referencedColumnName: 'id',
    },
  })
  buses: Bus[];

  @Column({
    nullable: false,
  })
  departure_location: string;

  @Column({
    nullable: false,
  })
  arrival_location: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  distance_km: number;

  @Column({
    nullable: false,
  })
  travel_duration_min: number;

  @Column({
    nullable: false,
  })
  departure_time: Date;

  @Column({
    nullable: false,
  })
  arrival_time: Date;
}
