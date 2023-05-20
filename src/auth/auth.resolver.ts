import { Context, Query, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Auth } from './dtos/object-types/auth.object-type';
import { AuthProfile } from './dtos/object-types/auth-profile.object-type';
import { AuthContext } from './interfaces/auth-context.interface';

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
