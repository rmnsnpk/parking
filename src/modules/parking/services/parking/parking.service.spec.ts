import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  fakeLicense,
  fakeParkingSlot,
  fakeSlotInfo,
} from '../../../../../test/mocks/parking/parking.mocks';
import { ParkingDBKeys } from '../../enums/parking.enum';
import { ParkingDataBaseService } from './parking-data-base.service';
import { ParkingService } from './parking.service';

describe('ParkingService', () => {
  let service: ParkingService;
  let dbService: ParkingDataBaseService;

  const mockParkingDataBaseService = {
    findOne: jest.fn((key: string) =>
      key === ParkingDBKeys.LICENSE ? of(null) : of(fakeParkingSlot),
    ),
    setDefaultValues: jest.fn(() => {
      return;
    }),
    update: jest.fn(() => of(fakeParkingSlot)),
  };
  const mockConfigService = {
    get: jest.fn(() => null),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingService,
        {
          provide: ParkingDataBaseService,
          useValue: mockParkingDataBaseService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
    dbService = module.get<ParkingDataBaseService>(ParkingDataBaseService);
    module.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run onModuleInit', () => {
    jest.spyOn(dbService, 'setDefaultValues');
    expect(dbService.setDefaultValues).toHaveBeenCalled();
  });

  describe('park', () => {
    it('should return parking slot', (done) => {
      service.park(fakeLicense.license).subscribe((res) => {
        expect(res).toEqual(fakeParkingSlot);
        done();
      });
    });

    it('throws exception "Car is already parked" if parkig slot already booked', (done) => {
      jest
        .spyOn(dbService, 'findOne')
        .mockImplementation(() => of(fakeParkingSlot));
      service.park(fakeLicense.license).subscribe({
        error: (err) => {
          expect(err.response).toEqual('Car is already parked');
          done();
        },
      });
    });

    it('throws exception "No free parking slots" if there are no parking slots available', (done) => {
      jest.spyOn(dbService, 'findOne').mockImplementation(() => of(null));
      service.park(fakeLicense.license).subscribe({
        error: (err) => {
          expect(err.response).toEqual('No free parking slots');
          done();
        },
      });
    });
  });

  describe('getSlotInfo', () => {
    it('throws exception "Not found" if parking slot no found', (done) => {
      jest.spyOn(dbService, 'findOne').mockImplementation(() => of(null));
      service.getSlotInfo(1).subscribe({
        error: (err) => {
          expect(err.response).toEqual('Not found');
          done();
        },
      });
    });

    it('should return slot info', (done) => {
      jest
        .spyOn(dbService, 'findOne')
        .mockImplementation(() => of({ ...fakeParkingSlot, isEmpty: true }));
      service.getSlotInfo(1).subscribe((res) => {
        expect(res).toEqual({ isEmpty: true });
        done();
      });
    });

    it('should return slot info if it is not empty', () => {
      jest
        .spyOn(dbService, 'findOne')
        .mockImplementation(() => of({ ...fakeParkingSlot }));
      service.getSlotInfo(1).subscribe((res) => {
        expect(res).toEqual(fakeSlotInfo);
      });
    });
  });

  describe('unpark', () => {
    it('should return parking slot', (done) => {
      service.unpark(fakeLicense.license).subscribe((res) => {
        expect(res).toEqual(fakeParkingSlot);
        done();
      });
    });

    it('throws exception "Not found" if license no found', (done) => {
      jest.spyOn(dbService, 'findOne').mockImplementation(() => of(null));
      service.unpark(fakeLicense.license).subscribe({
        error: (err) => {
          expect(err.response).toEqual('Not found');
          done();
        },
      });
    });
  });
});
