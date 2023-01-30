import { Test, TestingModule } from '@nestjs/testing';
import { fakeParkingSlot } from '../../../../../test/mocks/parking/parking.mocks';
import { ParkingDBKeys } from '../../enums/parking.enum';
import { ParkingDataBaseService } from './parking-data-base.service';

describe('ParkingDataBaseService', () => {
  let service: ParkingDataBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingDataBaseService],
    }).compile();

    service = module.get<ParkingDataBaseService>(ParkingDataBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find value', () => {
    service.setDefaultValues([fakeParkingSlot]);
    service
      .findOne(ParkingDBKeys.ID, fakeParkingSlot.slotNumber)
      .subscribe((res) => {
        expect(res).toEqual(fakeParkingSlot);
      });
  });

  it('should update value', () => {
    service.setDefaultValues([{ ...fakeParkingSlot, isEmpty: true }]);
    service.update(ParkingDBKeys.ID, fakeParkingSlot).subscribe((res) => {
      expect(res).toEqual(fakeParkingSlot);
    });
  });
});
