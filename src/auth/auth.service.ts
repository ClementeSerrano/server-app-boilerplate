import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async anonymousLogin(): Promise<{ accessToken: string }> {
    const payload = { isAnonymous: true };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
