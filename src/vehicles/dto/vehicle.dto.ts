import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsDateString, IsMongoId, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(17)
  vin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rego?: string;

  @ApiPropertyOptional({ default: 'BYD' })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  colour?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  odometer?: number;

  @ApiPropertyOptional({ enum: ['active', 'disposed', 'traded', 'written_off'], default: 'active' })
  @IsOptional()
  @IsEnum(['active', 'disposed', 'traded', 'written_off'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deliveredAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextServiceDue?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  warrantyExpiry?: Date;
}

export class UpdateVehicleDto extends CreateVehicleDto {}
