import { Module } from '@nestjs/common';
import { SeatsService } from './services/seats.service';
import { SeatsController } from './controllers/seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/typeorm/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  providers: [SeatsService],
  controllers: [SeatsController],
  exports: [SeatsService],
})
export class SeatsModule {}
