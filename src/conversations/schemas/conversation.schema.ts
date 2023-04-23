import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Message, MessageSchema } from './message.schema';

export type ConversationDocument = mongoose.HydratedDocument<Conversation>;

@Schema()
export class Conversation {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: [MessageSchema] })
  messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
