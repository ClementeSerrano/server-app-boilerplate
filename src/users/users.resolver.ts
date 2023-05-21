import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './dto/object-types/user.object-type';
import { UserService } from './users.service';
import { FindUserArgs } from './dto/find-user.dto';
import { CreateUserArgs } from './dto/create-user.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  public async user(@Args() args: FindUserArgs) {
    return this.userService.findOne(args);
  }

  @Query((returns) => [User])
  public async users() {
    return this.userService.findAll();
  }

  @Mutation((returns) => User)
  public async createUser(@Args() args: CreateUserArgs) {
    return this.userService.create({ ...args, isAnonymous: false });
  }
}
