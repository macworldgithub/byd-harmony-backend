const fs = require('fs');
const path = require('path');

const dirs = [
  'src/users/schemas',
  'src/locations/schemas',
  'src/locations/dto',
  'src/customers/schemas',
  'src/customers/dto',
  'src/vehicles/schemas',
  'src/vehicles/dto',
  'src/bookings/schemas',
  'src/bookings/dto',
  'src/job-cards/schemas',
  'src/job-cards/dto',
  'src/auth/dto',
  'src/auth/strategies'
];

dirs.forEach(dir => fs.mkdirSync(path.join(__dirname, dir), { recursive: true }));

const files = {
  // Users
  'src/users/schemas/user.schema.ts': \`import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from '../../locations/schemas/location.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ nullable: true })
  password?: string;

  @Prop()
  phone: string;

  @Prop({ enum: ['super_admin', 'admin', 'user'], default: 'user' })
  role: string;

  @Prop({ enum: ['sales', 'service', 'delivery', 'admin', 'executive', 'site_executive'] })
  staffRole: string;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  locationId: Location;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastSignedIn: Date;

  @Prop({ nullable: true })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
\`,
  // Auth
  'src/auth/dto/auth.dto.ts': \`import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
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
\`,
  'src/auth/strategies/jwt.strategy.ts': \`import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
\`,
  // Locations
  'src/locations/schemas/location.schema.ts': \`import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['sales', 'service', 'delivery', 'combined'] })
  type: string;

  @Prop()
  address: string;

  @Prop()
  suburb: string;

  @Prop()
  state: string;

  @Prop()
  postcode: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ default: 10 })
  capacity: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
\`,
  'src/locations/dto/location.dto.ts': \`import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsBoolean, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ['sales', 'service', 'delivery', 'combined'] })
  @IsNotEmpty()
  @IsEnum(['sales', 'service', 'delivery', 'combined'])
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  suburb?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @IsNumber()
  capacity?: number;
}

export class UpdateLocationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['sales', 'service', 'delivery', 'combined'] })
  @IsOptional()
  @IsEnum(['sales', 'service', 'delivery', 'combined'])
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  suburb?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
\`,
  // Customers
  'src/customers/schemas/customer.schema.ts': \`import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from '../../locations/schemas/location.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  suburb: string;

  @Prop()
  state: string;

  @Prop()
  postcode: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  licenceNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  preferredLocationId: Location;

  @Prop({ enum: ['prospect', 'active', 'service', 'inactive', 'archived'], default: 'prospect' })
  lifecycleStage: string;

  @Prop()
  source: string;

  @Prop({ default: true })
  consentSms: boolean;

  @Prop({ default: true })
  consentEmail: boolean;

  @Prop({ default: true })
  consentPhone: boolean;

  @Prop()
  notes: string;

  @Prop()
  aiSummary: string;

  @Prop()
  aiSummaryAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
\`,
  'src/customers/dto/customer.dto.ts': \`import { IsNotEmpty, IsOptional, IsString, IsEnum, IsBoolean, IsEmail, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  suburb?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  licenceNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  preferredLocationId?: string;

  @ApiPropertyOptional({ enum: ['prospect', 'active', 'service', 'inactive', 'archived'], default: 'prospect' })
  @IsOptional()
  @IsEnum(['prospect', 'active', 'service', 'inactive', 'archived'])
  lifecycleStage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  consentSms?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  consentEmail?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  consentPhone?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
\`,
  // Vehicles
  'src/vehicles/schemas/vehicle.schema.ts': \`import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Customer;

  @Prop({ maxlength: 17 })
  vin: string;

  @Prop()
  rego: string;

  @Prop({ default: 'BYD', required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  year: number;

  @Prop()
  colour: string;

  @Prop({ default: 0 })
  odometer: number;

  @Prop()
  odometerUpdatedAt: Date;

  @Prop({ enum: ['active', 'disposed', 'traded', 'written_off'], default: 'active' })
  status: string;

  @Prop()
  disposedAt: Date;

  @Prop()
  disposalNotes: string;

  @Prop()
  deliveredAt: Date;

  @Prop()
  nextServiceDue: Date;

  @Prop()
  warrantyExpiry: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
\`,
  'src/vehicles/dto/vehicle.dto.ts': \`import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsDateString, IsMongoId, MaxLength } from 'class-validator';
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
\`,
  // Bookings
  'src/bookings/schemas/booking.schema.ts': \`import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';
import { Vehicle } from '../../vehicles/schemas/vehicle.schema';
import { Location } from '../../locations/schemas/location.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Customer;

  @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true })
  vehicleId: Vehicle;

  @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
  locationId: Location;

  @Prop({ required: true })
  serviceDateTime: Date;

  @Prop({ required: true, enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] })
  serviceType: string;

  @Prop()
  serviceDetails: string;

  @Prop({ enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
\`,
  'src/bookings/dto/booking.dto.ts': \`import { IsNotEmpty, IsOptional, IsString, IsEnum, IsDateString, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  serviceDateTime: Date;

  @ApiProperty({ enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] })
  @IsNotEmpty()
  @IsEnum(['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'])
  serviceType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  serviceDetails?: string;

  @ApiPropertyOptional({ enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'])
  status?: string;
}

export class UpdateBookingDto extends CreateBookingDto {}
\`,
  // Job Cards
  'src/job-cards/schemas/job-card.schema.ts': \`import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';
import { Vehicle } from '../../vehicles/schemas/vehicle.schema';
import { Location } from '../../locations/schemas/location.schema';
import { Booking } from '../../bookings/schemas/booking.schema';
import { User } from '../../users/schemas/user.schema';

export type JobCardDocument = JobCard & Document;

@Schema({ timestamps: true })
export class JobCardItem {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ enum: ['labour', 'parts', 'sublet', 'sundry'] })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({ required: true }) // cents
  unitCost: number;

  @Prop({ required: true }) // cents
  totalCost: number;

  @Prop()
  partNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  technicianId: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const JobCardItemSchema = SchemaFactory.createForClass(JobCardItem);

@Schema({ timestamps: true })
export class JobCard {
  @Prop({ unique: true })
  orderNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  bookingId: Booking;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Customer;

  @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true })
  vehicleId: Vehicle;

  @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
  locationId: Location;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  technicianId: User;

  @Prop({ enum: ['open', 'in_progress', 'awaiting_parts', 'quality_check', 'completed', 'invoiced', 'closed'], default: 'open' })
  status: string;

  @Prop({ enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' })
  priority: string;

  @Prop({ required: true, enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] })
  serviceType: string;

  @Prop({ required: true })
  workRequired: string;

  @Prop()
  diagnosis: string;

  @Prop()
  odometerIn: number;

  @Prop()
  odometerOut: number;

  @Prop() // cents
  estimatedCost: number;

  @Prop() // cents
  actualCost: number;

  @Prop({ default: 0 }) // cents
  labourTotal: number;

  @Prop({ default: 0 }) // cents
  partsTotal: number;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop({ type: [JobCardItemSchema], default: [] })
  items: JobCardItem[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const JobCardSchema = SchemaFactory.createForClass(JobCard);
\`,
  'src/job-cards/dto/job-card.dto.ts': \`import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsMongoId } from 'class-validator';
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
  @IsOptional()
  @IsMongoId()
  technicianId?: string;

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

export class UpdateJobCardDto extends CreateJobCardDto {
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
  @IsOptional()
  @IsMongoId()
  technicianId?: string;
}
\`,
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filePath), content);
}
console.log('Schemas and DTOs created.');
