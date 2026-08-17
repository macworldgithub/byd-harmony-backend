import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateScheduleDeliveryDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  locationId: string;

  @IsDateString()
  @IsNotEmpty()
  deliveryDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
