import { JWT_CONSTANTS } from '../../../src/core/auth/constants/auth.constants';
import { JwtMessage } from 'src/core/auth/dto/jwt-message.dto';

export const fakeJwtMessage: JwtMessage = {
  accessToken: 'ksjnfkjnsfknk241234',
  expiresIn: JWT_CONSTANTS.expiresIn,
};
