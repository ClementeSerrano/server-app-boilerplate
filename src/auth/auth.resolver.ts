import { Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Auth } from './schemas/auth.gql.schema';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation((returns) => Auth)
  public async anonymousLogin() {
    return this.authService.anonymousLogin();
  }
}
