import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from 'src/typeorm';
import { BusesController } from './controllers/buses.controller';
import { BusesService } from './services/buses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  controllers: [BusesController],
  providers: [BusesService],
})
export class BusesModule {}
