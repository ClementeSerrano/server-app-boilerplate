import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';

import { ConversationsController } from './conversations/conversations.controller';
import { OpenAIService } from './openai/openai.service';
import { ConversationsService } from './conversations/conversations.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ConversationsController],
  providers: [OpenAIService, ConversationsService],
})
export class AppModule {}
