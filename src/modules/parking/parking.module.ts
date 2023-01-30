import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ParkingController } from './controllers/parking/parking.controller';
import { ParkingDataBaseService } from './services/parking/parking-data-base.service';
import { ParkingService } from './services/parking/parking.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService, ParkingDataBaseService, ConfigService],
})
export class ParkingModule {}
