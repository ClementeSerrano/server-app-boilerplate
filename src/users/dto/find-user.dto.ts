import { ArgsType, Field } from '@nestjs/graphql';
import { PartialType, PickType } from '@nestjs/mapped-types';

import { User } from '../schemas/user.schema';

export class FindUserDto extends PartialType(
  PickType(User, ['firstname', 'lastname', 'username']),
) {}

@ArgsType()
export class FindUserArgs {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;
}
