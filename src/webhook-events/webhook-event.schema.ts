import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WebhookEventDocument = WebhookEvent & Document;

@Schema({ timestamps: true })
export class WebhookEvent {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ApiKey', index: true })
  apiKeyId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  event: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  payload: Record<string, any>;

  @Prop({
    type: String,
    enum: ['pending', 'delivered', 'failed', 'skipped'],
    default: 'pending',
  })
  status: string;

  @Prop({ default: 0 })
  attempts: number;

  @Prop()
  lastAttemptAt: Date;

  @Prop()
  nextRetryAt: Date;

  @Prop()
  responseCode: number;

  @Prop()
  error: string;
}

export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);
WebhookEventSchema.index({ status: 1, nextRetryAt: 1 });
