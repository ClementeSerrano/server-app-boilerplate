import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GptService } from './gpt.service';

@Module({
  imports: [ConfigModule],
  providers: [GptService],
})
export class GptModule {}
