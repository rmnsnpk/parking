import { Test, TestingModule } from '@nestjs/testing';
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
});
