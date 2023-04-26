import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OpenAIModule } from 'src/openai/openai.module';
import { UserModule } from 'src/users/users.module';

// import { ConversationsController } from './conversations.controller';
import { ConversationResolver } from './conversations.resolver';
import { ConversationsService } from './conversations.service';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    OpenAIModule,
    UserModule,
  ],
  // controllers: [ConversationsController],
  providers: [ConversationResolver, ConversationsService],
})
export class ConversationsModule {}
