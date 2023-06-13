import { AuthType } from 'src/auth/interfaces/auth-type.interfaces';
import { User } from 'src/users/schemas/user.schema';

export class AuthProfile extends User {
  userId: string;
}

export class AuthPartialProfile {
  userId: string;
  authType: AuthType;
}
