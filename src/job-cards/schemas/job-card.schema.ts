import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
