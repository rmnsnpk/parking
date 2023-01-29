import { Test, TestingModule } from '@nestjs/testing';
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
});
