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
import { AuthProfile } from './interfaces/auth-profile.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private oAuth2Verifier;

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    this.oAuth2Verifier = auth({
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
      const payload = await this.jwtService.verifyAsync<AuthProfile>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      req.user = payload;
    } catch {
      // If that fails, validate using the OAuth.
      const oAuthVerifyAccessToken = promisify(this.oAuth2Verifier);

      try {
        await oAuthVerifyAccessToken(req, res);
      } catch (error) {
        console.log(error);

        if (error instanceof InvalidTokenError) {
          throw new UnauthorizedException('Invalid token');
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
}
