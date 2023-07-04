import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateSeatDTO {
  @IsNumber()
  readonly id: number;

  @IsBoolean()
  is_available: boolean;
}
