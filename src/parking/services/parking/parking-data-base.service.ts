import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ParkingSlotDto } from 'src/parking/dto/parking-slot.dto';

@Injectable()
export class ParkingDataBaseService {
  private data: ParkingSlotDto[];

  public setDefaultValues(size: number): void {
    this.data = new Array(size) as ParkingSlotDto[];
    for (let i = 0; i < size; i++) {
      this.data[i] = {
        license: null,
        slotNumber: i,
        isEmpty: true,
      };
    }
  }

  public create(license: string): Observable<ParkingSlotDto[]> {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isEmpty) {
        this.data[i] = {
          license: license,
          slotNumber: i,
          isEmpty: false,
        };
        return of([this.data[i]]);
      }
    }
    return of([]);
  }

  public findById(id: number): Observable<ParkingSlotDto[]> {
    if (id > 0 && id < this.data.length) {
      return of([this.data[id]]);
    }
    return of([]);
  }

  public findByLicense(license: string): Observable<ParkingSlotDto[]> {
    return of(
      this.data.filter((slotInfo) => {
        if (slotInfo.license === license) {
          return slotInfo;
        }
      }),
    );
  }

  public delete(id: number): Observable<ParkingSlotDto[]> {
    if (id > 0 || id < this.data.length) {
      const deletedData = { ...this.data[id], isEmpty: true };
      this.data[id].license = null;
      this.data[id].isEmpty = true;
      return of([deletedData]);
    }
    return of([]);
  }
}
