import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractorDto {
  @ApiProperty({
    example: 'Acme Logistics',
    description: 'The name of the contracting company',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    example: 'Transportation',
    description: 'The type of service provided by the contractor',
  })
  @IsString()
  @IsNotEmpty()
  typeOfService: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Contact phone number',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'contact@acmelogistics.com',
    description: 'Contact email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
