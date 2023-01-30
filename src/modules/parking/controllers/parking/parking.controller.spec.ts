import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  fakeLicense,
  fakeParkingSlot,
  fakeSlotInfo,
} from '../../../../../test/mocks/parking/parking.mocks';
import { ParkingService } from '../../services/parking/parking.service';
import { ParkingController } from './parking.controller';

describe('ParkingController', () => {
  let controller: ParkingController;
  const mockParkingService = {
    park: jest.fn(() => of(fakeParkingSlot)),
    getSlotInfo: jest.fn(() => of(fakeSlotInfo)),
    unpark: jest.fn(() => of(fakeParkingSlot)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [{ provide: ParkingService, useValue: mockParkingService }],
    }).compile();
    controller = module.get<ParkingController>(ParkingController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return parking slot on park', () => {
    controller.park(fakeLicense).subscribe((res) => {
      expect(res).toEqual(fakeParkingSlot);
    });
  });
  it('should return parking slot on unpark', () => {
    controller.unpark(fakeLicense.license).subscribe((res) => {
      expect(res).toEqual(fakeParkingSlot);
    });
  });
  it('should return  slot info on slot', () => {
    controller.getSlotInfo(5).subscribe((res) => {
      expect(res).toEqual(fakeSlotInfo);
    });
  });
});
