import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthTokenUnauthorized {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Sessão expirada',
  })
  message: string;
}
