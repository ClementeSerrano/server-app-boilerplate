import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { CreateAppDto } from './app.dto';

@Injectable()
export class AppService {
  createApp(app: CreateAppDto): CreateAppDto {
    const { name } = app;

    const appName = encodeURIComponent(name);

    const baseDir = '__app__';
    const appDir = path.join(process.cwd(), baseDir, appName);
    const publicDir = path.join(appDir, 'public');
    const srcDir = path.join(appDir, 'src');

    // Create app directories
    fs.mkdirSync(baseDir);
    fs.mkdirSync(appDir);
    fs.mkdirSync(publicDir);
    fs.mkdirSync(srcDir);

    // Create index.html file
    const indexHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${appName}</title>
        </head>
        <body>
          <div id="root" />
          <script src="./src/index.tsx"></script>
        </body>
      </html>
    `;

    fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);

    // Create index.tsx file
    const indexTsx = `
      import React from 'react';
      import ReactDOM from 'react-dom';

      function App() {
        return <h1>Hello World!</h1>;
      };

      ReactDOM.render(<App />, document.getElementById('root'));
    `;

    fs.writeFileSync(path.join(srcDir, 'index.tsx'), indexTsx);

    // Return app
    return app;
  }
}
