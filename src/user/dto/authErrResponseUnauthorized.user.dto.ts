import { GlobalErrorDto } from 'src/exceptions/globalErrorDto';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthErrUserDtoResponseUnauthorized extends GlobalErrorDto {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Senha incorreta. Tente novamente.',
  })
  message: string;
}
