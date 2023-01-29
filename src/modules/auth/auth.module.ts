import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/core/auth/jwt.strategy';
import { AuthService } from 'src/core/auth/services/auth.service';

import { UserModule } from '../user/user.module';
import { jwtConstants } from '../../core/auth/constants/auth.constants';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
