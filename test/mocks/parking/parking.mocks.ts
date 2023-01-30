import { LicenseDto } from 'src/modules/parking/dto/license.dto';
import { ParkingSlotDto } from 'src/modules/parking/dto/parking-slot.dto';
import { SlotInfoDto } from 'src/modules/parking/dto/slot-info.dto';

export const fakeSlotInfo: SlotInfoDto = {
  license: '1242424',
  isEmpty: false,
};

export const fakeParkingSlot: ParkingSlotDto = {
  license: '1242424',
  isEmpty: false,
  slotNumber: 1,
};

export const fakeLicense: LicenseDto = {
  license: '1242424',
};
export const fakeDefaultValue: ParkingSlotDto[] = [
  {
    license: null,
    isEmpty: true,
    slotNumber: 1,
  },
  {
    license: null,
    isEmpty: true,
    slotNumber: 2,
  },
  {
    license: null,
    isEmpty: true,
    slotNumber: 3,
  },
  {
    license: null,
    isEmpty: true,
    slotNumber: 4,
  },
  {
    license: null,
    isEmpty: true,
    slotNumber: 5,
  },
];
