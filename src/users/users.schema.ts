import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  anonUserId: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop([String])
  preferences: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
