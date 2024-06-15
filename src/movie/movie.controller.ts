import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthTokenNotFound, AuthTokenUnauthorized } from '../auth/dtos';
import { CreateResponseMovieDto } from './dtos/create-Response.user.dto';
import { CreateErrorMovieDto } from './dtos/create-error.movie.dto';
import { CreateMovieDto } from './dtos/create.movie.dto';
import { UpdateMovieDto } from './dtos/update.movie.dto';
import { MovieService } from './movie.service';
import { Request } from 'express';
import { MovieEntity } from './entities';
import { MovieDto } from './dtos/movie.dto';

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
  @ApiOperation({ summary: 'Listar filmes por usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista dos filmes por usuário',
    type: MovieDto,
    isArray: true,
  })
  findAll(@Req() request: Request): Promise<MovieDto[]> {
    return this.movieService.findAll(request.body);
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
