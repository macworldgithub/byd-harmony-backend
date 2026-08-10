import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  vehicleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  locationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  serviceDateTime: Date;

  @ApiProperty({ enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] })
  @IsNotEmpty()
  @IsEnum(['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'])
  serviceType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  serviceDetails?: string;

  @ApiPropertyOptional({ enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])
  status?: string;
}

export class UpdateBookingDto extends CreateBookingDto {}
