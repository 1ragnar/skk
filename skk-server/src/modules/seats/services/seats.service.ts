import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/typeorm';
import { Repository } from 'typeorm';
import { UpdateSeatDTO } from '../dtos/seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async updateSeat(data: UpdateSeatDTO) {
    try {
      let seatToUpdate = await this.seatRepository.findOneBy({ id: data.id });

      if (!seatToUpdate) {
        throw new HttpException(
          'There is no such payment',
          HttpStatus.BAD_REQUEST,
        );
      }
      seatToUpdate.is_available = data.is_available;
      let updatedSeat = await this.seatRepository.save(seatToUpdate);

      return { seat: seatToUpdate };
    } catch (error) {
      throw new HttpException(
        'An error occured while updating seat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
