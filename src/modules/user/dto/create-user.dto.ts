import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name', nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({ description: 'Password', nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
