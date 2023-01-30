import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { fakeUserWithHashedPassword } from '../../../../test/constants/testing.constants';
import { UserDataBaseService } from './user-data-base.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserDataBaseService,
        // {
        //   provide: UserDataBaseService,
        //   useValue: mockUserDataBaseService,
        // },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find user by username', () => {
    const spy = jest.spyOn(UserDataBaseService.prototype, 'findOne');
    spy.mockImplementation(() => of(fakeUserWithHashedPassword));
    service.getUserByName(fakeUserWithHashedPassword.name).subscribe((res) => {
      expect(res).toEqual(fakeUserWithHashedPassword);
    });
  });
  it('should create user', () => {
    const spy = jest.spyOn(UserDataBaseService.prototype, 'findOne');
    spy.mockImplementation(() => of(null));
    service.create(fakeUserWithHashedPassword).subscribe((res) => {
      expect(res).toEqual(fakeUserWithHashedPassword);
    });
  });
});
