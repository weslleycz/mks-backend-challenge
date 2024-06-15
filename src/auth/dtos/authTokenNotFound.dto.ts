import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthTokenNotFound {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Token não fornecido',
  })
  message: string;
}
