import { IsString, IsEnum, IsNumber, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ maxLength: 120 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({ enum: ["sales", "service", "reviews", "reminders", "general"], default: "general" })
  @IsEnum(["sales", "service", "reviews", "reminders", "general"])
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ enum: ["sms", "email"], default: "sms" })
  @IsEnum(["sms", "email"])
  @IsOptional()
  channel?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  isSeed?: number;
}

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}
