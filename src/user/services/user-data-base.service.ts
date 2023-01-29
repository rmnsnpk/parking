import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserDataBaseService {
  private data: UserDto[] = [];

  public findOne(username: string): Observable<UserDto> {
    for (const user of this.data) {
      if (user.name === username) {
        return of(user);
      }
    }
    return of(null);
  }
  public create(user): Observable<UserDto> {
    const id = this.data.length;
    this.data.push({
      ...user,
      id,
    });

    return of(this.data[id]);
  }
}
