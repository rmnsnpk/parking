import { Test, TestingModule } from '@nestjs/testing';
import { fakeCreateUserWithHashedPassword } from '../../../../test/constants/testing.constants';
import { UserDataBaseService } from './user-data-base.service';

describe('UserDataBaseService', () => {
  let service: UserDataBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDataBaseService],
    }).compile();

    service = module.get<UserDataBaseService>(UserDataBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create new user', () => {
    service.create(fakeCreateUserWithHashedPassword).subscribe((res) => {
      expect(res).toEqual({ ...fakeCreateUserWithHashedPassword, id: 0 });
    });
  });
});
