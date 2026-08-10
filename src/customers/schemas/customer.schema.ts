import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
