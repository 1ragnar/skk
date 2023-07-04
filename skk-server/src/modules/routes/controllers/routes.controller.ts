import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RouteDTO } from '../dtos/route.dto';
import { RoutesService } from '../services/routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @HttpCode(201)
  @Post('/search')
  async onSearch(@Body() routeDTO: RouteDTO) {
    try {
      const res = await this.routesService.search(routeDTO);
      return res;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
