import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
