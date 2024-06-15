import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthTokenNotFound, AuthTokenUnauthorized } from '../auth/dto';
import { CreateMovieDto } from './dtos/create.movie.dto';
import { UpdateMovieDto } from './dtos/update.movie.dto';
import { MovieService } from './movie.service';
import { CreateErrorMovieDto } from './dtos/create-error.movie.dto';
import { CreateResponseMovieDto } from './dtos/create-Response.user.dto';

@Controller('movie')
@ApiTags('Movie')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Token não fornecido',
  type: AuthTokenNotFound,
})
@ApiResponse({
  status: 400,
  description: 'Não foi possível atualizar o usuário.',
  type: AuthTokenUnauthorized,
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo filme' })
  @ApiResponse({
    status: 401,
    description: 'Não foi possível criar o filme.',
    type: CreateErrorMovieDto,
  })
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Filme criado com sucesso',
    type: CreateResponseMovieDto,
  })
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<CreateResponseMovieDto> {
    return await this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
