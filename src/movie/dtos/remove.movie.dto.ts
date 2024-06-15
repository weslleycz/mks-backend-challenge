import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class MovieResposeRemoveDto {
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Filme removido',
  })
  message: string;
}
