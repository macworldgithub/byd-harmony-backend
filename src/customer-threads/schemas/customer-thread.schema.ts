import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerThreadDocument = CustomerThread & Document;

export class ThreadAttachment {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  mimeType: string;

  @Prop()
  sizeBytes: number;
}

export class ThreadAuthor {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  role: string;
}

@Schema({ timestamps: true })
export class CustomerThread {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true, index: true })
  customerId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['note', 'email', 'sms', 'call', 'document', 'system'],
    default: 'note',
  })
  type: string;

  @Prop({
    type: String,
    enum: ['inbound', 'outbound', 'internal'],
    default: 'internal',
  })
  direction: string;

  @Prop()
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: [Object], default: [] })
  attachments: ThreadAttachment[];

  @Prop({ type: Object })
  author: ThreadAuthor;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CustomerThreadSchema = SchemaFactory.createForClass(CustomerThread);

// Compound index for efficient customer thread queries
CustomerThreadSchema.index({ customerId: 1, createdAt: -1 });
