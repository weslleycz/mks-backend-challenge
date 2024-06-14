import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class GlobalErrorDto {
  @ApiProperty({
    description: 'Código de status HTTP do erro',
  })
  abstract statusCode: HttpStatus;

  @ApiProperty({
    description: 'Mensagem de erro',
  })
  abstract message: string;
}
