import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateThreadAttachmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sizeBytes?: number;
}

export class CreateThreadEntryDto {
  @ApiProperty({ enum: ['note', 'email', 'sms', 'call', 'document', 'system'], default: 'note' })
  @IsOptional()
  @IsEnum(['note', 'email', 'sms', 'call', 'document', 'system'])
  type?: string;

  @ApiPropertyOptional({ enum: ['inbound', 'outbound', 'internal'], default: 'internal' })
  @IsOptional()
  @IsEnum(['inbound', 'outbound', 'internal'])
  direction?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiPropertyOptional({ type: [CreateThreadAttachmentDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateThreadAttachmentDto)
  attachments?: CreateThreadAttachmentDto[];
}
