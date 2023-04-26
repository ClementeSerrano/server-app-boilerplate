import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from 'src/users/users.module';

// import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  // controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
