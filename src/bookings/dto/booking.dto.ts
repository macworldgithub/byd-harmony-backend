import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString, IsMongoId, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

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
  scheduledAt: Date;

  @ApiPropertyOptional({ default: 60 })
  @IsOptional()
  @IsNumber()
  estimatedDuration?: number;

  @ApiPropertyOptional({ enum: ['routine', 'repair', 'warranty', 'recall', 'inspection', 'pre_delivery'], default: 'routine' })
  @IsOptional()
  @IsEnum(['routine', 'repair', 'warranty', 'recall', 'inspection', 'pre_delivery'])
  serviceType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'], default: 'scheduled' })
  @IsOptional()
  @IsEnum(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  assignedTechnicianId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  internalNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  completedAt?: Date;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
