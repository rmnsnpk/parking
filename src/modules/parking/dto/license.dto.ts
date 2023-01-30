import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LicenseDto {
  @ApiProperty({ description: 'Car lisence', nullable: false })
  @IsNotEmpty()
  license: string;
}
