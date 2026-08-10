import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from '../../locations/schemas/location.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ nullable: true })
  password?: string;

  @Prop()
  phone: string;

  @Prop({ enum: ['super_admin', 'admin', 'user'], default: 'user' })
  role: string;

  @Prop({ enum: ['sales', 'service', 'delivery', 'admin', 'executive', 'site_executive'] })
  staffRole: string;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  locationId: Location;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastSignedIn: Date;

  @Prop({ nullable: true })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
