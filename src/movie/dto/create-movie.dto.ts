import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: '06/08/2010',
    description: 'A data de lançamento do filme',
  })
  @IsNotEmpty()
  @IsDateString()
  release_date: string;

  @ApiProperty({ example: 'Ação', description: 'O gênero do filme' })
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty({ example: '120', description: 'A duração do filme em minutos' })
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiProperty({ example: 'A Origem', description: 'O título do filme' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
