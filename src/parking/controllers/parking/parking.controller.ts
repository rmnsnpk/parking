import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LicenseDto } from 'src/parking/dto/license.dto';
import { ParkingService } from 'src/parking/services/parking/parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  @Post('park')
  park(@Body() licenseDto: LicenseDto) {
    return this.parkingService.park(licenseDto.license);
  }

  @Get('slot:slotId')
  getSlotInf(@Param('slotId') slotId: string) {
    return this.parkingService.getSlotInfo(slotId);
  }

  @Delete('unpark:license')
  unpark(@Param('license') license: string) {
    return this.parkingService.unpark(license);
  }
}
