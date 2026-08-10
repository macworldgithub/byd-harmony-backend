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
