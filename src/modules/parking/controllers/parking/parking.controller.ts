import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { LicenseDto } from '../../dto/license.dto';
import { ParkingSlotDto } from '../../dto/parking-slot.dto';
import { SlotInfoDto, SlotInfoEmptyDto } from '../../dto/slot-info.dto';
import { ParkingService } from '../../services/parking/parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('park')
  park(@Body() licenseDto: LicenseDto): Observable<ParkingSlotDto> {
    return this.parkingService.park(licenseDto.license);
  }

  @UseGuards(JwtAuthGuard)
  @Get('slot::slotId')
  getSlotInfo(
    @Param('slotId', new ParseIntPipe()) slotId: number,
  ): Observable<SlotInfoDto | SlotInfoEmptyDto> {
    return this.parkingService.getSlotInfo(slotId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('unpark::license')
  unpark(@Param('license') license: string): Observable<ParkingSlotDto> {
    return this.parkingService.unpark(license);
  }
}
