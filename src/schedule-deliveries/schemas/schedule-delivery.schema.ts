import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDeliveryDocument = ScheduleDelivery & Document;

@Schema({ timestamps: true })
export class ScheduleDelivery {
  @Prop({ type: String, required: true })
  customerId: string;

  @Prop({ type: String, required: true })
  locationId: string;

  @Prop({ required: true })
  deliveryDate: Date;

  @Prop()
  notes: string;
}

export const ScheduleDeliverySchema = SchemaFactory.createForClass(ScheduleDelivery);
