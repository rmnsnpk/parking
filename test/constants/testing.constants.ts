import { jwtConstants } from '../../src/core/auth/constants/auth.constants';
import { JwtMessage } from 'src/core/auth/dto/jwt-message.dto';
import { LicenseDto } from 'src/modules/parking/dto/license.dto';
import { ParkingSlotDto } from 'src/modules/parking/dto/parking-slot.dto';
import { SlotInfoDto } from 'src/modules/parking/dto/slot-info.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';

export const fakeJwtMessage: JwtMessage = {
  accessToken: 'ksjnfkjnsfknk241234',
  expiresIn: jwtConstants.expiresIn,
};

export const fakeCreateUser: CreateUserDto = {
  name: 'fakeName',
  password: '24234',
};

export const fakeCreateUserWithHashedPassword: CreateUserDto = {
  name: 'fakeName',
  password: '$2a$10$ODZPkIzp5wrcbcsNJaQEIuVAqfkoFwOIcR5jKBdaUS3zj.P1onTD6',
};

export const fakeUserWithHashedPassword: UserDto = {
  name: 'fakeName',
  password: '$2a$10$ODZPkIzp5wrcbcsNJaQEIuVAqfkoFwOIcR5jKBdaUS3zj.P1onTD6',
  id: 1,
};

export const fakeUserWithHashedPassword1: UserDto = {
  name: 'fakeName1',
  password: '$2a$10$ODZPkIzp5wrcbcsNJaQEIuVAqfkoFwOIcR5jKBdaUS3zj.P1onTD6',
  id: 1,
};

export const fakeSlotInfo: SlotInfoDto = {
  license: '1242424',
  isEmpty: false,
};

export const fakeParkingSlot: ParkingSlotDto = {
  license: '1242424',
  isEmpty: false,
  slotNumber: 1,
};

export const fakeLicense: LicenseDto = {
  license: '1242424',
};
