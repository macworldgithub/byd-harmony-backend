import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBulkCampaignDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ enum: ['all_live_clients', 'buying_journey', 'trading_upgrading', 'service_maintenance'] })
  @IsNotEmpty()
  @IsEnum(['all_live_clients', 'buying_journey', 'trading_upgrading', 'service_maintenance'])
  segment: string;
}
