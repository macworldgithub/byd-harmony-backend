import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsMongoId, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: ['super_admin', 'admin', 'user'] })
  @IsOptional()
  @IsEnum(['super_admin', 'admin', 'user'])
  role?: string;

  @ApiPropertyOptional({ enum: ['sales', 'service', 'delivery', 'admin', 'executive', 'site_executive'] })
  @IsOptional()
  @IsEnum(['sales', 'service', 'delivery', 'admin', 'executive', 'site_executive'])
  staffRole?: string;

  @ApiPropertyOptional({ 
    description: 'Must be a valid MongoDB ObjectId. Omit or set to null if the user has no assigned location.',
    example: '60d5ec49f1b2c8a1234567ab'
  })
  @IsOptional()
  @ValidateIf((o) => o.locationId != null && o.locationId !== '')
  @IsMongoId()
  @Transform(({ value }) => (value === '' || value === null) ? undefined : value)
  locationId?: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RefreshDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
