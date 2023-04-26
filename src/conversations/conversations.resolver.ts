import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ConversationsService } from './conversations.service';
import { ChatArgs } from './dto/chat.dto';
import { ChatResponse, Conversation } from './schemas/conversation.gql.schema';
import { Message } from './schemas/message.schema';

@Resolver((of) => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationsService) {}

  @Query((returns) => Conversation)
  public async conversation(@Args('_id', { type: () => String }) _id: string) {
    return this.conversationService.findById(_id);
  }

  @Query((returns) => [Conversation])
  public async conversations(
    @Args('userId', { type: () => String, nullable: true }) userId?: string,
    @Args('title', { type: () => String, nullable: true }) title?: string,
  ) {
    return this.conversationService.findAll({ userId, title });
  }

  @Mutation((returns) => ChatResponse)
  public async chat(@Args() args: ChatArgs) {
    return this.conversationService.chat(args);
  }

  @ResolveField('messages', (returns) => [Message])
  public async messages(@Parent() conversation: Conversation) {
    return this.conversationService.findMessages(conversation._id);
  }
}
