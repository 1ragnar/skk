import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './controllers/tickets.controller';
import { TicketsService } from './services/tickets.service';
import { Ticket } from 'src/typeorm';
import { PaymentsModule } from '../payments/payments.module';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), PaymentsModule, SeatsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
