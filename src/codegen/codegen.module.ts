import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CodegenService } from './codegen.service';

@Module({
  imports: [ConfigModule],
  providers: [CodegenService],
})
export class CodegenModule {}
