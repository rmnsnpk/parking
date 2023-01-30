import { Injectable } from '@nestjs/common';
import { DataBase } from '../../../../core/db/db';
import { ParkingSlotDto } from '../../dto/parking-slot.dto';

@Injectable()
export class ParkingDataBaseService extends DataBase<ParkingSlotDto> {
  public setDefaultValues(defaultValues: ParkingSlotDto[]): void {
    this.data$.next(defaultValues);
  }
}
