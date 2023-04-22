import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationsModule } from './conversations/conversations.module';
import { OpenAIModule } from './openai/openai.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ConversationsModule,
    UserModule,
    OpenAIModule,
    AuthModule,
  ],
})
export class AppModule {}
