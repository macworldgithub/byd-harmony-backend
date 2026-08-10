import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReminderDocument = Reminder & Document;

@Schema({ timestamps: true })
export class Reminder {
  @Prop()
  clientId: number;

  @Prop({ maxlength: 120 })
  clientName: string;

  @Prop({ required: true, maxlength: 200 })
  title: string;

  @Prop({ required: true })
  dueAt: Date;

  @Prop({ required: true, default: 0 })
  done: number;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);
