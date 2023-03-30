import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptService } from './gpt/gpt.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '__apps__', 'client', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GptService],
})
export class AppModule {}
