import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';

import { CreateAppDto } from './app.dto';
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
    await writeFile(path.join(srcDir, 'App.tsx'), appTsx);

    // Build the app
    await this.buildApp();

    // Return app
    return app;
  }

  private buildApp(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec('cd __apps__/client && yarn build', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      });
    });
  }
}
