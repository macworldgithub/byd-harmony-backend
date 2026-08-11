import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApiKeyDocument = ApiKey & Document;

@Schema({ timestamps: true })
export class ApiKey {
  @Prop({ required: true, maxlength: 200 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 64 })
  keyHash: string;

  @Prop({ required: true, maxlength: 16 })
  keyPrefix: string;

  @Prop({
    type: String,
    enum: ['sales', 'service', 'delivery', 'admin', 'executive', 'readonly'],
    default: 'readonly',
  })
  role: string;

  @Prop()
  locationId: string;

  @Prop({
    type: String,
    enum: ['sales', 'service', 'delivery', 'finance', 'executive'],
  })
  department: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: [String],
    default: [
      'customers',
      'vehicles',
      'bookings',
      'jobs',
      'documents',
      'locations',
      'activity',
      'stats',
    ],
  })
  scopes: string[];

  @Prop()
  webhookUrl: string;

  @Prop()
  webhookSecret: string;

  @Prop({
    type: String,
    enum: ['immediate', 'linear', 'exponential'],
    default: 'exponential',
  })
  retryStrategy: string;

  @Prop({ default: 3 })
  maxRetries: number;

  @Prop()
  lastUsedAt: Date;

  @Prop()
  createdById: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
