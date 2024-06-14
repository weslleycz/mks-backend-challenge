import { GlobalErrorDto } from 'src/exceptions/globalErrorDto';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthErrDtoResponseNotFound extends GlobalErrorDto {
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
