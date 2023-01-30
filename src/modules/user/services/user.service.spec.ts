import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { fakeUserWithHashedPassword } from '../../../../test/mocks/user/user.mocks';
import { UserDataBaseService } from './user-data-base.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let dbService: UserDataBaseService;

  const mockUserDataBaseService = {
    findOne: jest.fn(() => of(fakeUserWithHashedPassword)),
    setDefaultValues: jest.fn(() => {
      return;
    }),
    update: jest.fn(() => of(fakeUserWithHashedPassword)),
    create: jest.fn(() => of(fakeUserWithHashedPassword)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserDataBaseService,
          useValue: mockUserDataBaseService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    dbService = module.get<UserDataBaseService>(UserDataBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByName', () => {
    it('should find user by username', (done) => {
      service
        .getUserByName(fakeUserWithHashedPassword.name)
        .subscribe((res) => {
          expect(res).toEqual(fakeUserWithHashedPassword);
          done();
        });
    });

    it('should throw an error "User with name: "SomeName" not found" if findOne returns null', (done) => {
      jest.spyOn(dbService, 'findOne').mockImplementation(() => of(null));
      service.getUserByName(fakeUserWithHashedPassword.name).subscribe({
        error: (err) => {
          expect(err.response).toEqual(
            `User with name: "${fakeUserWithHashedPassword.name}" not found`,
          );
          done();
        },
      });
    });
  });

  describe('create', () => {
    it('should create user', (done) => {
      jest.spyOn(dbService, 'findOne').mockImplementation(() => of(null));
      service.create(fakeUserWithHashedPassword).subscribe((res) => {
        expect(res).toEqual(fakeUserWithHashedPassword);
        done();
      });
    });

    it('should throw an error "User with name: "SomeName" not found" if findOne returns user', (done) => {
      jest
        .spyOn(dbService, 'findOne')
        .mockImplementation(() => of(fakeUserWithHashedPassword));
      service.create(fakeUserWithHashedPassword).subscribe({
        error: (err) => {
          expect(err.response).toEqual(
            `User with name: "${fakeUserWithHashedPassword.name}" already exists`,
          );
          done();
        },
      });
    });
  });
});
