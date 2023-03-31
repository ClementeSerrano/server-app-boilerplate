import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CodexService } from './codex/codex.service';
import { AppsController } from './apps/apps.controller';
import { AppsService } from './apps/apps.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '__apps__', 'client', 'build'),
    }),
  ],
  controllers: [AppsController],
  providers: [AppsService, CodexService],
})
export class AppModule {}
