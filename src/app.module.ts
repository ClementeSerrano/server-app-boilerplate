import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationsModule } from './conversations/conversations.module';
import { OpenAIModule } from './openai/openai.module';
import { AnonUserMiddleware } from './users/anon-user.middleware';
import { UserController } from './users/user.controller';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ConversationsModule,
    UserModule,
    OpenAIModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AnonUserMiddleware).forRoutes(UserController);
  }
}
