import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserDBKeys } from '../enums/user.enum';
import { UserDataBaseService } from './user-data-base.service';

@Injectable()
export class UserService {
  constructor(private db: UserDataBaseService) {}

  public getUserByName(name: string): Observable<UserDto> {
    return this.db.findOne(UserDBKeys.NAME, name).pipe(
      map((foundUser) => {
        if (foundUser === null) {
          throw new HttpException(
            `User with name: "${name}" not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        return foundUser;
      }),
    );
  }

  public create(createUserDto: CreateUserDto): Observable<UserDto> {
    return this.db.findOne(UserDBKeys.NAME, createUserDto.name).pipe(
      switchMap((foundUser) => {
        if (foundUser !== null) {
          throw new HttpException(
            `User with name: "${createUserDto.name}" already exists`,
            HttpStatus.CONFLICT,
          );
        }
        return this.db.create(createUserDto);
      }),
    );
  }
}
