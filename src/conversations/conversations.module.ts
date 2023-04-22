import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAIModule } from 'src/openai/openai.module';
import { OpenAIService } from 'src/openai/openai.service';

import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    OpenAIModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, OpenAIService],
})
export class ConversationsModule {}
