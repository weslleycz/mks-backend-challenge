import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class AuthErrDtoResponseNotFound {
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
  @ApiProperty({
    example:
      'O e-mail não está cadastrado. Por favor, verifique se está correto.',
  })
  message: string;
}
