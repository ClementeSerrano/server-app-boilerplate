import { ConversationUserRole } from '../interfaces/conversations.interfaces';
import { MessageMetadata } from '../schemas/message-metadata.schema';

export class CreateMessageDto {
  conversationId: string;
  role: ConversationUserRole;
  content: string;
  metadata?: MessageMetadata;
}
