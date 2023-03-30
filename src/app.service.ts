import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { CreateAppDto } from './app.dto';
import { execSync } from 'child_process';
import { GptService } from './gpt/gpt.service';

@Injectable()
export class AppService {
  constructor(private gptService: GptService) {}

  public async createApp(app: CreateAppDto): Promise<CreateAppDto> {
    // const appName = app.name;
    const appPrompt = app.prompt;

    const srcDir = '__apps__/client/src';

    const appTsx = await this.gptService.createCodeCompletion(appPrompt);

    // Update the content in the App.tsx file
    fs.writeFileSync(path.join(srcDir, 'App.tsx'), appTsx);

    // Build the app
    execSync('yarn --cwd __apps__/client build', { stdio: 'inherit' });

    // Return app
    return app;
  }
}
