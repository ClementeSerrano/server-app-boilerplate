import { ConversationUserRole } from '../interfaces/conversations.interfaces';

export class CreateMessageDto {
  conversationId: string;
  role: ConversationUserRole;
  content: string;
}
