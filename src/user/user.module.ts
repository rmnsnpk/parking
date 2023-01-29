import { Module } from '@nestjs/common';
import { UserDataBaseService } from './services/user-data-base.service';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService, UserDataBaseService],
  exports: [UserService],
})
export class UserModule {}
