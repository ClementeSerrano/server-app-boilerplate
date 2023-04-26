import { PartialType, PickType } from '@nestjs/mapped-types';
import { Field, ArgsType } from '@nestjs/graphql';

import { User } from '../schemas/users.schema';

export class CreateUserDto extends PartialType(
  PickType(User, [
    'username',
    'password',
    'firstname',
    'lastname',
    'preferences',
  ]),
) {}

@ArgsType()
export class CreateUserArgs {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field((type) => [String], { nullable: true })
  preferences?: string[];
}
