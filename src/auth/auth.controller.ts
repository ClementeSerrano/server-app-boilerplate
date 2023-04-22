import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('anonymous-login')
  public async anonymousLogin(): Promise<{ accessToken: string }> {
    return this.authService.anonymousLogin();
  }
}
