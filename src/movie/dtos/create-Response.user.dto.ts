import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseMovieDto {
  @ApiProperty({
    example: 'Filme criado com sucesso',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;
}
