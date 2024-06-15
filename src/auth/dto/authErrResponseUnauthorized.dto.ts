import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class AuthErrDtoResponseUnauthorized {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Senha incorreta. Tente novamente.',
  })
  message: string;
}
