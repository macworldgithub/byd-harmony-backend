import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContractorDocument = Contractor & Document;

@Schema({ timestamps: true })
export class Contractor {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  typeOfService: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;
}

export const ContractorSchema = SchemaFactory.createForClass(Contractor);
