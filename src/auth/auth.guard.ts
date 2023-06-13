import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';

import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { AuthContext } from './interfaces/auth-context.interface';
import {
  AuthPartialProfile,
  AuthProfile,
} from './interfaces/auth-profile.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private oAuthVerifier;

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    this.oAuthVerifier = auth({
      audience: this.configService.get<string>('AUTH0_AUDIENCE'),
      issuerBaseURL: this.configService.get<string>('AUTH0_ISSUER_BASE_URL'),
      tokenSigningAlg: 'RS256',
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const { req, res } = ctx.getContext<AuthContext>();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // First, try to validate the token using JwtService
      const nativeAuthPayload =
        await this.jwtService.verifyAsync<AuthPartialProfile>(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });

      req.user = nativeAuthPayload;
    } catch (error) {
      // If that fails, validate using OAuth.
      const verifyOAuthAccessToken = promisify(this.oAuthVerifier);

      try {
        await verifyOAuthAccessToken(req, res);

        req.user = this.extractProfileFromAuth0Token(token);
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          throw new UnauthorizedException('Invalid token.');
        }

        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedException();
        }

        throw new InternalServerErrorException();
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractProfileFromAuth0Token(token: string): AuthProfile {
    const payload = this.jwtService.decode(token);

    const auth0Audience = this.configService.get<string>('AUTH0_AUDIENCE');

    return {
      userId: payload[`${auth0Audience}/userId`],
      oauthId: payload[`${auth0Audience}/userId`],
      email: payload[`${auth0Audience}/email`],
      firstname: payload[`${auth0Audience}/firstname`],
      lastname: payload[`${auth0Audience}/lastname`],
      avatar: payload[`${auth0Audience}/avatar`],
      username: payload[`${auth0Audience}/username`],
      authType: 'oauth2',
    };
  }
}
