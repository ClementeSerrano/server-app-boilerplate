import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from './schemas/users.gql.schema';
import { UserService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  public async user(@Args('_id', { type: () => String }) _id: string) {
    return this.userService.findById(_id);
  }

  @Query((returns) => [User])
  public async users() {
    return this.userService.findAll();
  }
}
