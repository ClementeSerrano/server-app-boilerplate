import { Request, Response } from 'express';

import { AuthPartialProfile, AuthProfile } from './auth-profile.interface';

export type AuthContext = {
  req: Request & {
    user: AuthPartialProfile | AuthProfile;
  };
  res: Response;
};
