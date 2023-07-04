import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from 'src/typeorm';
import { Repository } from 'typeorm';
import { RouteDTO } from '../dtos/route.dto';
import { transformRoutesData } from '../helpers/helpers';

const SEARCH_LIMIT = 20;
@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async search(data: RouteDTO) {
    try {
      const queryBuilder = this.routeRepository.createQueryBuilder('route');

      if (data.departure_time) {
        queryBuilder.andWhere('route.departure_time >= :departure_time', {
          departure_time: data.departure_time,
        });
      }

      if (data.arrival_location !== undefined && data.arrival_location !== '') {
        queryBuilder.andWhere('route.arrival_location = :arrival_location', {
          arrival_location: data.arrival_location,
        });
      }

      const dbRoutes = await queryBuilder
        .leftJoinAndSelect('route.buses', 'bus')
        .leftJoinAndSelect('bus.seats', 'seat')
        .getMany();

      let transformedRoutes = transformRoutesData(dbRoutes);

      const distinctArrivalLocations = await this.routeRepository
        .createQueryBuilder('route')
        .select('DISTINCT route.arrival_location', 'arrival_location')

        .getRawMany();

      const arrivalLocations = distinctArrivalLocations
        .map((item) => item.arrival_location)
        .sort((a, b) => a.localeCompare(b, 'hr'));

      return {
        routes: transformedRoutes,
        arrivalLocations: arrivalLocations,
      };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
