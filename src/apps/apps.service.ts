import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';

import { CreateAppDto } from './apps.dto';
import { CodegenService } from '../codegen/codegen.service';
import { CLIENT_APPS_ROOT_PATH, CLIENT_APPS_SRC_PATH } from './apps.constants';

@Injectable()
export class AppsService {
  constructor(private codegenService: CodegenService) {}

  public async createApp(app: CreateAppDto): Promise<CreateAppDto> {
    // const appName = app.name;
    const appPrompt = app.prompt;

    const appTsx = await this.codegenService.createCompletion(appPrompt);

    // Update the content in the App.tsx file
    await writeFile(path.join(CLIENT_APPS_SRC_PATH, 'App.tsx'), appTsx);

    // Build the client app
    await this.buildApp();

    // Return app
    return app;
  }

  private buildApp(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(
        `cd ${CLIENT_APPS_ROOT_PATH} && yarn build`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
          resolve();
        },
      );
    });
  }
}
