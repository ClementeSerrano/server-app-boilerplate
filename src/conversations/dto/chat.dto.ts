import { Message } from '../schemas/message.schema';

export class ChatDto {
  userId: string;
  conversationId?: string;
  message: Message;
}
