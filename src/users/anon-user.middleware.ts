import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserService } from './users.service';

@Injectable()
export class AnonUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const anonUserId = req.headers['anon_user_id'] as string;

    if (anonUserId) {
      const user = await this.userService.findByAnonUserId(anonUserId);

      if (!user) {
        await this.userService.createAnonUser(anonUserId);
      }
    }
    next();
  }
}
