import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { ConversationUserRole } from '../conversations.types';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({
    type: String,
    required: true,
    enum: ['system', 'user', 'assistant'],
  })
  role: ConversationUserRole;

  @Prop({ type: String, required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
