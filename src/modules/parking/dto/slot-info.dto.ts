import { ApiProperty } from '@nestjs/swagger';

export class SlotInfoEmptyDto {
  @ApiProperty({ description: 'Is slot empty', nullable: false })
  isEmpty: boolean;
}

export class SlotInfoDto extends SlotInfoEmptyDto {
  @ApiProperty({ description: 'Lisence', nullable: true })
  license: string | null;
}
