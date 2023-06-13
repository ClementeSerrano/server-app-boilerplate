import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AuthType } from 'src/auth/interfaces/auth-type.interfaces';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop()
  email?: string;

  @Prop()
  firstname?: string;

  @Prop()
  lastname?: string;

  @Prop()
  avatar?: string;

  @Prop([String])
  preferences?: string[];

  @Prop()
  password?: string;

  @Prop({
    type: String,
    required: true,
    enum: ['anonymous', 'oauth2', 'native'],
  })
  authType: AuthType;

  @Prop({ unique: true })
  oauthId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
