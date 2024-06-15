import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthTokenNotFound, AuthTokenUnauthorized } from '../auth/dtos';
import { CreateResponseMovieDto } from './dtos/create-Response.user.dto';
import { CreateErrorMovieDto } from './dtos/create-error.movie.dto';
import { CreateMovieDto } from './dtos/create.movie.dto';
import { MovieDto } from './dtos/movie.dto';
import { UpdateMovieDto } from './dtos/update.movie.dto';
import { MovieService } from './movie.service';
import { MovieResponseNotFoundDto } from './dtos/movieResponseNotFound.dto';
import { MovieResposeRemoveDto } from './dtos/remove.movie.dto';
import { UpdateResponseMovieDto } from './dtos/update-response.movie.dto';

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
  async findAll(@Req() request: Request): Promise<MovieDto[]> {
    return this.movieService.findAll(request.body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Selecionar filme por id' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o filme selecionado',
    type: MovieDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não encontrado',
    type: MovieResponseNotFoundDto,
  })
  @ApiParam({ name: 'id', description: 'ID do filme' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar filme' })
  @ApiResponse({
    status: 200,
    description: 'Filme atualizado',
    type: UpdateResponseMovieDto,
  })
  @ApiParam({ name: 'id', description: 'ID do filme' })
  @ApiResponse({
    status: 404,
    description: 'Filme atualizado',
    type: MovieResponseNotFoundDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID do filme' })
  @ApiOperation({ summary: 'Deletar filme por id' })
  @ApiResponse({
    status: 200,
    description: 'Filme removido',
    type: MovieResposeRemoveDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não encontrado',
    type: MovieResponseNotFoundDto,
  })
  async remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
