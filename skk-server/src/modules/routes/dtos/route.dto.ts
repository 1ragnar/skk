import { IsDate, IsNumber, IsString } from 'class-validator';

export class RouteDTO {
  @IsString()
  readonly arrival_location?: string;

  @IsDate()
  readonly departure_time?: Date;
}
