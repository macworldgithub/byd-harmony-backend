import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsMongoId, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobCardDto {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  bookingId?: string;

  @ApiPropertyOptional()
  @ValidateIf(o => o.technicianId != null && String(o.technicianId).trim() !== '')
  @IsMongoId()
  technicianId?: string | null;

  @ApiPropertyOptional({ enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' })
  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority?: string;

  @ApiProperty({ enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] })
  @IsNotEmpty()
  @IsEnum(['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'])
  serviceType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  workRequired: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  odometerIn?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  estimatedCost?: number;
}

export class UpdateJobCardDto {
  @ApiPropertyOptional()
  @ValidateIf(o => o.technicianId != null && String(o.technicianId).trim() !== '')
  @IsMongoId()
  technicianId?: string | null;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  odometerOut?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  actualCost?: number;

  @ApiPropertyOptional({ enum: ['open', 'in_progress', 'awaiting_parts', 'quality_check', 'completed', 'invoiced', 'closed'] })
  @IsOptional()
  @IsEnum(['open', 'in_progress', 'awaiting_parts', 'quality_check', 'completed', 'invoiced', 'closed'])
  status?: string;

  @ApiPropertyOptional({ enum: ['low', 'normal', 'high', 'urgent'] })
  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority?: string;
}

export class JobCardItemDto {
  @ApiProperty({ enum: ['labour', 'parts', 'sublet', 'sundry'] })
  @IsNotEmpty()
  @IsEnum(['labour', 'parts', 'sublet', 'sundry'])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitCost: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partNumber?: string;

  @ApiPropertyOptional()
  @ValidateIf(o => o.technicianId != null && String(o.technicianId).trim() !== '')
  @IsMongoId()
  technicianId?: string | null;
}
