import { PartialType, PickType } from '@nestjs/mapped-types';

import { User } from '../schemas/user.schema';
import { AuthType } from 'src/auth/interfaces/auth-type.interfaces';

export class CreateUserDto extends PartialType(
  PickType(User, ['password', 'firstname', 'lastname', 'preferences']),
) {
  username: string;
  authType: AuthType;
}
