import { ApiProperty } from '@nestjs/swagger';

export class JwtMessage {
  @ApiProperty({ description: 'Token', nullable: false })
  accessToken: string;

  @ApiProperty({ description: 'Exppires in', nullable: false })
  expiresIn: number;
}
