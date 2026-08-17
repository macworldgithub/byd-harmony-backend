import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScheduleDeliveryDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the customer',
  })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'The unique identifier of the location',
  })
  @IsString()
  @IsNotEmpty()
  locationId: string;

  @ApiProperty({
    example: '2026-08-20T10:00:00Z',
    description: 'The scheduled date and time for the delivery',
  })
  @IsDateString()
  @IsNotEmpty()
  deliveryDate: string;

  @ApiPropertyOptional({
    example: 'Customer requested a morning delivery if possible.',
    description: 'Additional notes for the delivery',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
