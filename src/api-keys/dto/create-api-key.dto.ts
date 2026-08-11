import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsUrl,
  MaxLength,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsEnum(['sales', 'service', 'delivery', 'admin', 'executive', 'readonly'])
  role?: string;

  @IsOptional()
  @IsString()
  locationId?: string;

  @IsOptional()
  @IsEnum(['sales', 'service', 'delivery', 'finance', 'executive'])
  department?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scopes?: string[];

  @IsOptional()
  @IsUrl()
  webhookUrl?: string;

  @IsOptional()
  @IsString()
  webhookSecret?: string;

  @IsOptional()
  @IsEnum(['immediate', 'linear', 'exponential'])
  retryStrategy?: string;

  @IsOptional()
  @IsInt()
  maxRetries?: number;

  @IsOptional()
  @IsString()
  createdById?: string;
}
