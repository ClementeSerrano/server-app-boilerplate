import { Request } from 'express';

import { AuthProfile } from './auth-profile.types';

export type AuthContext = {
  req: Request & { user: AuthProfile };
};
