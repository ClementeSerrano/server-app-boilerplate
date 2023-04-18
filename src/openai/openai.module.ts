import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OpenAIService } from './openai.service';

@Module({
  imports: [ConfigModule],
  providers: [OpenAIService],
})
export class OpenAIModule {}
