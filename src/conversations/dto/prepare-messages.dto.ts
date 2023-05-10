import { Message } from '../schemas/message.schema';

export class PrepareMessagesDto {
  conversationMessages: Message[] | null;
  userPreferences: string[];
}
