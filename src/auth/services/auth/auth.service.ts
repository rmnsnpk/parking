import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { jwtConstants } from 'src/auth/constants/auth.constants';
import { JwtMessage } from 'src/auth/dto/jwt-message.dto';
import { UnverifiedUserDto } from 'src/user/dto/unverified-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private validateUser(
    loginUser: UnverifiedUserDto,
  ): Observable<UserDto | boolean> {
    return this.userService.getUserByUsername(loginUser.name).pipe(
      switchMap((user) => {
        if (user) {
          return from(bcryptjs.compare(loginUser.password, user.password)).pipe(
            map((isUserValidated) => {
              if (isUserValidated) {
                return user as UserDto;
              }
              return false;
            }),
          );
        }
        return of(false);
      }),

      catchError(() => {
        return of(false);
      }),
    );
  }
  public login(user: UnverifiedUserDto): Observable<JwtMessage> {
    return this.validateUser(user).pipe(
      map((validatedUser) => {
        if (validatedUser) {
          return {
            accessToken: this.jwtService.sign(
              { name: this.validateUser.name },
              { expiresIn: jwtConstants.expiresIn },
            ),
            expiresIn: jwtConstants.expiresIn,
          };
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  public authNewUser(user: UnverifiedUserDto) {
    return from(bcryptjs.hash(user.password, 10)).pipe(
      map((hashedPassword) => {
        return {
          name: user.name,
          password: hashedPassword,
        } as UserDto;
      }),
      switchMap((user) => {
        return this.userService.createNewUser(user).pipe(
          map((user) => {
            if (user) {
              return {
                accessToken: this.jwtService.sign(
                  { name: user.name },
                  { expiresIn: jwtConstants.expiresIn },
                ),
                expiresIn: jwtConstants.expiresIn,
              };
            } else {
              throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
          }),
        );
      }),
    );
  }
}
