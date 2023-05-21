import { Request } from 'express';

import { AuthProfile } from './auth-profile.interface';

export type AuthContext = {
  req: Request & { user: AuthProfile };
};
