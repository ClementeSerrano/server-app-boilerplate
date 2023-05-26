import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ConversationsService } from './conversations.service';
import { User } from 'src/users/dto/object-types/user.object-type';
import { Message } from './dtos/object-types/message.object-type';
import { Conversation } from './dtos/object-types/conversation.object-type';
import { Conversation as ConversationDBSchema } from './schemas/conversation.schema';
import { UserService } from 'src/users/users.service';
import { ChatArgs } from './dtos/args/chat.args';
import { ChatResponse } from './dtos/object-types/chat.object-type';
import { ActivityChatArgs } from './dtos/args/activity-chat.args';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private readonly conversationService: ConversationsService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Conversation)
  public async conversation(@Args('_id', { type: () => String }) _id: string) {
    return this.conversationService.findById(_id);
  }

  @Query(() => [Conversation])
  public async conversations(
    @Args('userId', { type: () => String, nullable: true }) userId?: string,
    @Args('title', { type: () => String, nullable: true }) title?: string,
  ) {
    return this.conversationService.findAll({ userId, title });
  }

  @Mutation(() => ChatResponse)
  public async chat(@Args() args: ChatArgs) {
    return this.conversationService.chat(args);
  }

  @Mutation(() => ChatResponse)
  public async activityChat(@Args() args: ActivityChatArgs) {
    return this.conversationService.activityChat(args);
  }

  @ResolveField('messages', () => [Message])
  public async messages(@Parent() conversation: Conversation) {
    return this.conversationService.findMessages(conversation._id);
  }

  @ResolveField('user', () => [User])
  public async user(@Parent() conversation: ConversationDBSchema) {
    return this.userService.findById(conversation.userId);
  }
}
