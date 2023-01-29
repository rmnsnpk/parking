import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { ParkingSlotDto } from '../../dto/parking-slot.dto';
import { SlotInfoDto, SlotInfoEmptyDto } from '../../dto/slot-info.dto';
import { ParkingDBKeys } from '../../enums/parking.enum';
import { ParkingDataBaseService } from './parking-data-base.service';

@Injectable()
export class ParkingService {
  constructor(private db: ParkingDataBaseService) {}

  onModuleInit() {
    const defaultValues = this.getDefaultValues(
      process.env.PARKING_SIZE || '5',
    );
    this.db.setDefaultValues(defaultValues);
  }

  public park(license: string): Observable<ParkingSlotDto> {
    return this.db.findOne(ParkingDBKeys.IS_EMPTY, true).pipe(
      switchMap((parkingSlot) => {
        if (parkingSlot === null) {
          throw new HttpException('No free parking slots', HttpStatus.CONFLICT);
        }
        const bookedParkingSlot = this.bookParkingSlot(parkingSlot, license);
        return this.db.update(bookedParkingSlot);
      }),
    );
  }

  public getSlotInfo(id: number): Observable<SlotInfoDto | SlotInfoEmptyDto> {
    return this.db.findOne(ParkingDBKeys.ID, id).pipe(
      map((parkingSlot) => {
        if (parkingSlot === null) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        if (!parkingSlot.isEmpty) {
          return {
            license: parkingSlot.license,
            isEmpty: parkingSlot.isEmpty,
          };
        }
        return { isEmpty: parkingSlot.isEmpty };
      }),
    );
  }

  public unpark(license: string): Observable<ParkingSlotDto> {
    return this.db.findOne(ParkingDBKeys.LICENSE, license).pipe(
      switchMap((parkingSlot) => {
        if (parkingSlot === null) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        const clearedParkingSlot = this.clearParkingSlot(parkingSlot);
        return this.db.update(clearedParkingSlot).pipe(
          map((parkingSlot) => {
            return {
              ...parkingSlot,
              license,
            };
          }),
        );
      }),
    );
  }

  private bookParkingSlot(
    parkingSlot: ParkingSlotDto,
    license: string,
  ): ParkingSlotDto {
    return {
      ...parkingSlot,
      isEmpty: false,
      license,
    };
  }

  private clearParkingSlot(parkingSlot: ParkingSlotDto): ParkingSlotDto {
    return {
      ...parkingSlot,
      isEmpty: true,
      license: null,
    };
  }

  private getDefaultValues(size: string): ParkingSlotDto[] {
    const defaultValues: ParkingSlotDto[] = [];
    for (let i = 1; i <= +size; i++) {
      defaultValues.push({
        slotNumber: i,
        license: null,
        isEmpty: true,
      });
    }
    return defaultValues;
  }
}
