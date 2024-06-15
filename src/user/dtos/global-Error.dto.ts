import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class GlobalErrorDto {
  @ApiProperty({
    description: 'Código de status HTTP do erro',
  })
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'Mensagem de erro',
  })
  message: string;
}
