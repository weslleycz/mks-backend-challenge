import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponse {
  @ApiProperty({
    example: 'Usuário atualizado',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: HttpStatus.OK;
}
