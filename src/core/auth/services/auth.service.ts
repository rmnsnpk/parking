import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { JWT_CONSTANTS } from '../constants/auth.constants';

import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserService } from '../../../modules/user/services/user.service';
import { JwtMessage } from '../dto/jwt-message.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public login(user: CreateUserDto): Observable<JwtMessage> {
    return this.validateUser(user).pipe(
      map((validatedUser) => {
        if (!validatedUser) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
          return {
            accessToken: this.jwtService.sign(
              { name: user.name },
              { expiresIn: JWT_CONSTANTS.expiresIn },
            ),
            expiresIn: JWT_CONSTANTS.expiresIn,
          };
        }
      }),
    );
  }

  public signUp(user: CreateUserDto): Observable<JwtMessage> {
    return from(bcryptjs.hash(user.password, 10)).pipe(
      map((hashedPassword) => {
        return {
          name: user.name,
          password: hashedPassword,
        } as CreateUserDto;
      }),
      switchMap((user) => {
        return this.userService.create(user).pipe(
          map((user) => {
            return {
              accessToken: this.jwtService.sign(
                { name: user.name },
                { expiresIn: JWT_CONSTANTS.expiresIn },
              ),
              expiresIn: JWT_CONSTANTS.expiresIn,
            };
          }),
        );
      }),
    );
  }

  private validateUser(
    loginUser: CreateUserDto,
  ): Observable<UserDto | boolean> {
    return this.userService.getUserByName(loginUser.name).pipe(
      switchMap((user) =>
        from(bcryptjs.compare(loginUser.password, user.password)).pipe(
          map((isUserValidated: boolean) => {
            if (isUserValidated) {
              return user as UserDto;
            }
            return false;
          }),
        ),
      ),
      catchError(() => of(false)),
    );
  }
}
