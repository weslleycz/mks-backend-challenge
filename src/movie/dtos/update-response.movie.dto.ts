import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponseMovieDto {
  @ApiProperty({
    example: 'Filme atualizado',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;
}
