import { Injectable } from '@nestjs/common';
import { map, Observable, take } from 'rxjs';
import { DataBase } from 'src/core/db/db';
import { ParkingSlotDto } from '../../dto/parking-slot.dto';

@Injectable()
export class ParkingDataBaseService extends DataBase<ParkingSlotDto> {
  public setDefaultValues(defaultValues: ParkingSlotDto[]): void {
    this.data$.next(defaultValues);
  }

  public update(parkingSlot: ParkingSlotDto): Observable<ParkingSlotDto> {
    return this.data$.pipe(
      take(1),
      map((data) => {
        const updatedData = data.map((slot) =>
          slot.slotNumber === parkingSlot.slotNumber ? parkingSlot : slot,
        );
        this.data$.next(updatedData);
        return parkingSlot;
      }),
    );
  }
}
