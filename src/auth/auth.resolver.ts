import { Context, Query, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Auth } from './schemas/auth.gql.schema';
import { AuthProfile } from './schemas/auth-profile.gql.schema';
import { AuthContext } from './types/auth-context.types';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => AuthProfile)
  public profile(@Context() context: AuthContext) {
    return context.req.user;
  }

  @Public()
  @Mutation((returns) => Auth)
  public async anonymousRegister() {
    return this.authService.anonymousRegister();
  }
}
