import { IsNotEmpty } from 'class-validator';

export class LicenseDto {
  @IsNotEmpty()
  license: string;
}
