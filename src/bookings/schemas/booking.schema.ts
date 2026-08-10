import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  scheduledAt: Date;

  @Prop({ default: 60 })
  estimatedDuration: number;

  @Prop({ required: true, enum: ['routine', 'repair', 'warranty', 'recall', 'inspection', 'pre_delivery'], default: 'routine' })
  serviceType: string;

  @Prop()
  description: string;

  @Prop({ enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'], default: 'scheduled' })
  status: string;

  @Prop()
  assignedTechnicianId: number;

  @Prop()
  customerNotes: string;

  @Prop()
  internalNotes: string;

  @Prop()
  completedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
