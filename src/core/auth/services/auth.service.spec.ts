import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  fakeJwtMessage,
  fakeUserWithHashedPassword,
} from '../../../../test/constants/testing.constants';
import { UserService } from '../../../modules/user/services/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    getUserByName: jest.fn(() => of(fakeUserWithHashedPassword)),
    create: jest.fn(() => of(fakeUserWithHashedPassword)),
  };
  const mockJwtService = {
    sign: jest.fn(({}, {}) => of(fakeJwtMessage.accessToken)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return jwt token', () => {
    service.login(fakeUserWithHashedPassword).subscribe((res) => {
      expect(res).toEqual(fakeJwtMessage);
    });
  });
  it('should return jwt token', () => {
    service.signUp(fakeUserWithHashedPassword).subscribe((res) => {
      expect(res).toEqual(fakeJwtMessage);
    });
  });
});
