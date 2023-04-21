import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationsModule } from './conversations/conversations.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ConversationsModule,
    OpenAIModule,
  ],
})
export class AppModule {}
