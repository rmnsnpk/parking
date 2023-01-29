import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UnverifiedUserDto } from 'src/user/dto/unverified-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: UnverifiedUserDto) {
    return this.authService.login(user);
  }

  @Post('signup')
  signUp(@Body() user: UnverifiedUserDto) {
    return this.authService.authNewUser(user);
  }
}
