import { ApiProperty } from '@nestjs/swagger';

export class ParkingSlotDto {
  @ApiProperty({
    description: 'Lisence',
    nullable: true,
    type: 'string',
  })
  license: string | null;

  @ApiProperty({ description: 'Slot number', nullable: false })
  slotNumber: number;

  @ApiProperty({ description: 'Is slot empty', nullable: false })
  isEmpty: boolean;
}
