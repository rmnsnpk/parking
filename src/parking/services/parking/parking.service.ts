import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { ParkingSlotDto } from 'src/parking/dto/parking-slot.dto';
import { SlotInfoDto } from 'src/parking/dto/slot-info.dto';
import { removeColon } from 'src/parking/tools/remove-colon';
import { ParkingDataBaseService } from './parking-data-base.service';

@Injectable()
export class ParkingService {
  private parkingSize: number | string;

  constructor(private db: ParkingDataBaseService) {}

  onModuleInit() {
    this.parkingSize = process.env.PARKING_SIZE ? process.env.PARKING_SIZE : 5;
    this.db.setDefaultValues(+this.parkingSize);
  }

  public park(license: string): Observable<ParkingSlotDto> {
    if (typeof license === 'string') {
      return this.db.findOne(license).pipe(
        switchMap((parkingInfo) => {
          if (parkingInfo === null) {
            return this.db.create(license).pipe(
              map((parkingInfo) => {
                if (parkingInfo === null) {
                  throw new HttpException('Can not park', HttpStatus.CONFLICT);
                }
                return parkingInfo;
              }),
            );
          }
          throw new HttpException('Already parked', HttpStatus.CONFLICT);
        }),
      );
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  public getSlotInfo(id: string): Observable<SlotInfoDto> {
    id = removeColon(id);
    if (typeof +id !== 'number') {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.db.findById(+id).pipe(
      map((parkingInfo) => {
        if (parkingInfo === null) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        if (!parkingInfo.isEmpty) {
          return {
            license: parkingInfo.license,
            isEmpty: parkingInfo.isEmpty,
          };
        }
        return { isEmpty: true };
      }),
    );
  }

  public unpark(license: string): Observable<ParkingSlotDto> {
    license = removeColon(license);
    return this.db.findOne(license).pipe(
      switchMap((parkingInfo) => {
        if (parkingInfo === null) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return this.db.delete(parkingInfo.slotNumber);
      }),
    );
  }
}
