import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateErrorMovieDto {
  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Não foi possível criar o filme.',
  })
  message: string;
}
