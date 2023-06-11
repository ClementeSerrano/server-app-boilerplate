import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async anonymousRegister(): Promise<{ accessToken: string }> {
    const newUser = await this.userService.create({
      username: uuidv4(),
      isAnonymous: true,
    });

    const userId = newUser._id.toString();

    const payload = { sub: userId, isAnonymous: true };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
