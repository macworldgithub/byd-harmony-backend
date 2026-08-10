import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, MaxLength } from 'class-validator';

export class CreateReminderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @ApiProperty({ required: false, maxLength: 120 })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  clientName?: string;

  @ApiProperty({ required: true, maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDateString()
  dueAt: string;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  done?: number;
}

export class UpdateReminderDto extends PartialType(CreateReminderDto) {}
