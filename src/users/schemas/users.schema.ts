import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  firstname?: string;

  @Prop()
  lastname?: string;

  @Prop([String])
  preferences?: string[];

  @Prop()
  password?: string;

  @Prop()
  isAnonymous: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);