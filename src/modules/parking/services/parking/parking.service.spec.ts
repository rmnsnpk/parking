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
  let dbService: ParkingDataBaseService;

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
    dbService = module.get<ParkingDataBaseService>(ParkingDataBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('park', () => {
    it('should return parking slot', () => {
      service.park(fakeLicense.license).subscribe((res) => {
        expect(res).toEqual(fakeParkingSlot);
      });
    });

    it('should return error "Car is already parked" if parkig slot already booked', () => {
      jest.spyOn(dbService, 'findOne').mockImplementation(() => of(null));
      service.park(fakeLicense.license).subscribe({
        error: (err) => expect(err.message).toEqual('Car is already parked'),
      });
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
