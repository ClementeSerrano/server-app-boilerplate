import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from 'src/users/users.service';
import {
  AuthPartialProfile,
  AuthProfile,
} from './interfaces/auth-profile.interface';
import { FindAuthProfileDto } from './dtos/find-auth-profile.dto';
import { OAuthRegisterDto } from './dtos/oauth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async findProfile(
    findProfileDto: FindAuthProfileDto,
  ): Promise<AuthProfile> {
    const { userId, authType } = findProfileDto;

    const user = await this.userService.findById(userId, authType);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return { userId, ...user.toObject() };
  }

  public async anonymousRegister(): Promise<{ accessToken: string }> {
    const newUser = await this.userService.create({
      username: uuidv4(),
      authType: 'anonymous',
    });

    const authProfile: AuthPartialProfile = {
      userId: newUser._id.toString(),
      authType: 'anonymous',
    };

    return {
      accessToken: await this.jwtService.signAsync(authProfile),
    };
  }

  public async oauthRegister(
    oauthRegisterDto: OAuthRegisterDto,
  ): Promise<{ accessToken: string }> {
    const { userId, ...userDto } = oauthRegisterDto.user;

    const user = await this.userService.findById(userId, userDto.authType);

    if (!user) {
      await this.userService.create({
        ...userDto,
        username:
          (userDto as AuthProfile).username || (userDto as AuthProfile).email,
        oauthId: userId,
      });
    }

    return {
      accessToken: oauthRegisterDto.accessToken,
    };
  }
}
