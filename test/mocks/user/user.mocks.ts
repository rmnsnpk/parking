import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';

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
export const fakeUser: UserDto = {
  name: 'fakeName',
  password: '12412',
  id: 1,
};
