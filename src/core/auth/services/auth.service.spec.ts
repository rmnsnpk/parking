import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { fakeJwtMessage } from '../../../../test/mocks/auth/auth.mocks';
import {
  fakeCreateUser,
  fakeUser,
  fakeUserWithHashedPassword,
} from '../../../../test/mocks/user/user.mocks';

import { UserService } from '../../../modules/user/services/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  const mockUserService = {
    getUserByName: jest.fn(() => of(fakeUserWithHashedPassword)),
    create: jest.fn(() => of(fakeUserWithHashedPassword)),
  };

  const mockJwtService = {
    sign: jest.fn(() => fakeJwtMessage.accessToken),
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
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return jwt token if loggin correct', (done) => {
      jest
        .spyOn(userService, 'getUserByName')
        .mockImplementation(() => of(fakeUserWithHashedPassword));
      service.login(fakeCreateUser).subscribe((res) => {
        expect(res).toEqual(fakeJwtMessage);
        done();
      });
    });
    it('should throw error "NOT FOUND" if user not found', (done) => {
      jest.spyOn(userService, 'getUserByName').mockImplementation(() => {
        return throwError(
          new HttpException(`User not found`, HttpStatus.NOT_FOUND),
        );
      });
      service.login(fakeCreateUser).subscribe({
        error: (err) => {
          expect(err.response).toEqual(`User not found`);
          done();
        },
      });
    });
    it('should throw error "NOT FOUND" if user not found', (done) => {
      jest.spyOn(userService, 'getUserByName').mockImplementation(() => {
        return throwError(
          new HttpException(`User not found`, HttpStatus.NOT_FOUND),
        );
      });
      service.login(fakeCreateUser).subscribe({
        error: (err) => {
          expect(err.response).toEqual(`User not found`);
          done();
        },
      });
    });
    it('should throw error "NOT FOUND" if user not found', (done) => {
      jest
        .spyOn(userService, 'getUserByName')
        .mockImplementation(() => of(fakeUser));
      service.login(fakeCreateUser).subscribe({
        error: (err) => {
          expect(err.response).toEqual(`User not found`);
          done();
        },
      });
    });
  });

  describe('signUp', () => {
    it('should return jwt token if signUp success', (done) => {
      service.signUp(fakeCreateUser).subscribe((res) => {
        expect(res).toEqual(fakeJwtMessage);
        done();
      });
    });
  });
});
