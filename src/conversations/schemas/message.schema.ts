import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ConversationUserRole } from '../interfaces/conversations.interfaces';
import {
  MessageMetadata,
  MessageMetadataSchema,
} from './message-metadata.schema';

export type MessageDocument = mongoose.HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  })
  conversationId: string;

  @Prop({
    type: String,
    required: true,
    enum: ['system', 'user', 'assistant'],
  })
  role: ConversationUserRole;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: MessageMetadataSchema })
  metadata?: MessageMetadata;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
