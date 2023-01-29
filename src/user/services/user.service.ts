import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { UnverifiedUserDto } from '../dto/unverified-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserDataBaseService } from './user-data-base.service';

@Injectable()
export class UserService {
  constructor(private db: UserDataBaseService) {}

  public getUserByUsername(username: string): Observable<UserDto> {
    return this.db.findOne(username);
  }

  public createNewUser(user: UnverifiedUserDto): Observable<UserDto> {
    return this.db.findOne(user.name).pipe(
      switchMap((userFromDb) => {
        if (userFromDb === null) {
          return this.db.create(user);
        }
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }),
    );
  }
}
