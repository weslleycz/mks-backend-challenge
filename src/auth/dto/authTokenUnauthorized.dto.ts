import { GlobalErrorDto } from 'src/exceptions/globalErrorDto';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class AuthTokenUnauthorized extends GlobalErrorDto {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Sessão expirada',
  })
  message: string;
}
