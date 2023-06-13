import { Context, Query, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Auth } from './dtos/object-types/auth.object-type';
import { AuthProfile } from './dtos/object-types/auth-profile.object-type';
import { AuthContext } from './interfaces/auth-context.interface';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthProfile)
  public profile(@Context() context: AuthContext) {
    return this.authService.findProfile(context.req.user);
  }

  @Public()
  @Mutation(() => Auth)
  // TODO: Add deviceId
  public async anonymousRegister() {
    return this.authService.anonymousRegister();
  }

  @Mutation(() => Auth)
  public async oauthRegister(@Context() context: AuthContext) {
    return this.authService.oauthRegister({
      user: context.req.user,
      accessToken: context.req.headers.authorization,
    });
  }
}
