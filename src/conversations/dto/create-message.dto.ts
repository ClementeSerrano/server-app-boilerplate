import { ConversationUserRole } from '../conversations.types';

export class CreateMessageDto {
  conversationId: string;
  role: ConversationUserRole;
  content: string;
}
