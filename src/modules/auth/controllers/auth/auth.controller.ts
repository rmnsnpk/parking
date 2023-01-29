import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { JwtMessage } from '../../../../core/auth/dto/jwt-message.dto';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: CreateUserDto): Observable<JwtMessage> {
    return this.authService.login(user);
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto): Observable<JwtMessage> {
    return this.authService.signUp(user);
  }
}
