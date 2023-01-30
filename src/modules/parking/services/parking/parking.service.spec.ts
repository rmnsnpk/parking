import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  fakeLicense,
  fakeParkingSlot,
  fakeSlotInfo,
} from '../../../../../test/constants/testing.constants';
import { ParkingDataBaseService } from './parking-data-base.service';
import { ParkingService } from './parking.service';

describe('ParkingService', () => {
  let service: ParkingService;

  const mockParkingDataBaseService = {
    findOne: jest.fn(() => of(fakeParkingSlot)),
    setDefaultValues: jest.fn(() => {
      return;
    }),
    update: jest.fn(() => of(fakeParkingSlot)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingService,
        {
          provide: ParkingDataBaseService,
          useValue: mockParkingDataBaseService,
        },
      ],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return parking slot', () => {
    service.park(fakeLicense.license).subscribe((res) => {
      expect(res).toEqual(fakeParkingSlot);
    });
  });
  it('should return parking slot', () => {
    service.unpark(fakeLicense.license).subscribe((res) => {
      expect(res).toEqual(fakeParkingSlot);
    });
  });
  it('should return slot info', () => {
    service.getSlotInfo(1).subscribe((res) => {
      expect(res).toEqual(fakeSlotInfo);
    });
  });
});
