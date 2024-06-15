import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class MovieResponseNotFoundDto {
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Filme não encontrado',
  })
  message: string;
}
