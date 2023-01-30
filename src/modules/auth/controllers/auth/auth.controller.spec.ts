import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { fakeJwtMessage } from '../../../../../test/mocks/auth/auth.mocks';
import { fakeCreateUser } from '../../../../../test/mocks/user/user.mocks';

import { AuthService } from '../../../../core/auth/services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(() => of(fakeJwtMessage)),
    signUp: jest.fn(() => of(fakeJwtMessage)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should send jwt from service on login', () => {
    controller.login(fakeCreateUser).subscribe((res) => {
      expect(res).toEqual(fakeJwtMessage);
    });
  });
  it('should send jwt from service on signup', () => {
    controller.signUp(fakeCreateUser).subscribe((res) => {
      expect(res).toEqual(fakeJwtMessage);
    });
  });
});
