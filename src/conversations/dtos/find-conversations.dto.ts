import { PartialType, PickType } from '@nestjs/mapped-types';
import { Conversation } from '../schemas/conversation.schema';

export class FindConversationsDto extends PartialType(
  PickType(Conversation, ['title', 'userId']),
) {}
