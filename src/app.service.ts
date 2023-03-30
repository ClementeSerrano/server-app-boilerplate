import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { CreateAppDto } from './app.dto';
import { execSync } from 'child_process';

@Injectable()
export class AppService {
  createApp(app: CreateAppDto): CreateAppDto {
    const appName = app.name;

    const srcDir = '__apps__/client/src';

    // Create App.tsx file
    const appTsx = `
      import React from 'react';

      export default function App() {
        return (
          <div className="App">
            <header className="App-header">
              <h1>This is the ${appName} app!</h1>
             </header>
          </div>
        )
      };
    `;

    // Update the content in the App.tsx file
    fs.writeFileSync(path.join(srcDir, 'App.tsx'), appTsx);

    // Build the app
    execSync('yarn --cwd __apps__/client build', { stdio: 'inherit' });

    // Return app
    return app;
  }
}
