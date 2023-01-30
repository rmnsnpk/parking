import { Injectable } from '@nestjs/common';
import { DataBase } from '../../../core/db/db';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserDataBaseService extends DataBase<UserDto> {}
