import { Injectable } from '@nestjs/common';
import { map, Observable, take } from 'rxjs';
import { DataBase } from '../../../core/db/db';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserDataBaseService extends DataBase<UserDto> {
  public create(createUserDto: CreateUserDto): Observable<UserDto> {
    return this.data$.pipe(
      take(1),
      map((data) => {
        const id = data.length;
        const user = {
          id,
          ...createUserDto,
        };
        this.data$.next([...data, user]);
        return user;
      }),
    );
  }
}
