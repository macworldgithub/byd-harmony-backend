import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BulkCampaign } from './bulk-campaign.schema';
import { Customer } from '../../customers/schemas/customer.schema';

export type BulkRecipientDocument = BulkRecipient & Document;

@Schema({ timestamps: true })
export class BulkRecipient {
  @Prop({ type: Types.ObjectId, ref: 'BulkCampaign', required: true })
  campaignId: BulkCampaign | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customerId: Customer | Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  renderedBody: string;

  @Prop({
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  })
  status: string;

  @Prop()
  error: string;
}

export const BulkRecipientSchema = SchemaFactory.createForClass(BulkRecipient);
