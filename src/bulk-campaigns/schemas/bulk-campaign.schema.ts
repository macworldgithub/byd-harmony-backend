import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BulkCampaignDocument = BulkCampaign & Document;

@Schema({ timestamps: true })
export class BulkCampaign {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  body: string;

  @Prop({
    required: true,
    enum: ['all_live_clients', 'buying_journey', 'trading_upgrading', 'service_maintenance'],
  })
  segment: string;

  @Prop({ default: 0 })
  totalRecipients: number;

  @Prop({ default: 0 })
  sentCount: number;

  @Prop({ default: 0 })
  failedCount: number;

  @Prop({
    enum: ['draft', 'sending', 'complete', 'failed'],
    default: 'draft',
  })
  status: string;
}

export const BulkCampaignSchema = SchemaFactory.createForClass(BulkCampaign);
