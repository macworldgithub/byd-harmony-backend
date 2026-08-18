import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ type: String, ref: 'Customer', required: true })
  customerId: string | Customer;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  _locationId: Types.ObjectId;

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
