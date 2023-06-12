import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './dto/object-types/user.object-type';
import { UserService } from './users.service';
import { FindUserArgs } from './dto/args/find-user.args';
import { CreateUserArgs } from './dto/args/create-user.args';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  public async user(@Args() args: FindUserArgs) {
    return this.userService.findOne(args);
  }

  @Query(() => [User])
  public async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  public async createUser(@Args() args: CreateUserArgs) {
    return this.userService.create({ ...args, authType: 'native' });
  }
}
