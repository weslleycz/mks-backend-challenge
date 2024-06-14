import { GlobalErrorDto } from 'src/exceptions/globalErrorDto';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthTokenNotFound extends GlobalErrorDto {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Token não fornecido',
  })
  message: string;
}
