import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  release_date: string;
  @ApiProperty()
  genre: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
