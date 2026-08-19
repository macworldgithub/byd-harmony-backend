import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true, maxlength: 120 })
  name: string;

  @Prop({ enum: ["sales", "service", "reviews", "reminders", "general"], default: "general", required: true })
  category: string;

  @Prop({ enum: ["sms", "email"], default: "sms", required: true })
  channel: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: 0, required: true })
  isSeed: number;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
