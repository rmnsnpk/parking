import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtMessage } from '../../../../core/auth/dto/jwt-message.dto';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CreateUserDto } from '../../../../modules/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: JwtMessage,
  })
  @Post('login')
  login(@Body() user: CreateUserDto): Observable<JwtMessage> {
    return this.authService.login(user);
  }

  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: JwtMessage,
  })
  @Post('signup')
  signUp(@Body() user: CreateUserDto): Observable<JwtMessage> {
    return this.authService.signUp(user);
  }
}
