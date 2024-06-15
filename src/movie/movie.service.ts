import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create.movie.dto';
import { UpdateMovieDto } from './dtos/update.movie.dto';
import { MovieRepository } from './repositorys';
import { UserRepository } from '../user/repositorys/user.repository';
import { CreateResponseMovieDto } from './dtos/create-Response.user.dto';
import { AuthToken } from '../auth/dtos';
import { MovieEntity } from './entities';
import { MovieResposeRemoveDto } from './dtos/remove.movie.dto';
import { RedisService } from '../services';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}
  async create(
    createMovieDto: CreateMovieDto,
  ): Promise<CreateResponseMovieDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: createMovieDto.id,
        },
      });
      await this.movieRepository.save({
        createdAt: new Date(),
        updatedAt: new Date(),
        duration: createMovieDto.duration,
        genre: createMovieDto.genre,
        release_date: createMovieDto.release_date,
        title: createMovieDto.title,
        user: user,
      });
      await this.redisService.delValue(user.id);
      return {
        message: 'Filme criado com sucesso',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Não foi possível criar o filme.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllByUser({ id }: AuthToken): Promise<MovieEntity[]> {
    const moviesCache = await this.redisService.getValue(id);
    if (moviesCache) {
      return JSON.parse(moviesCache);
    } else {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['movies'],
      });
      await this.redisService.setValue(
        user.id,
        JSON.stringify(user.movies),
        7200,
      );
      return user.movies;
    }
  }

  async findOne(id: string) {
    try {
      const movie = await this.movieRepository.findOne({
        where: {
          id,
        },
      });
      if (movie) {
        return {
          ...movie,
        };
      } else {
        throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    { duration, genre, release_date, title }: UpdateMovieDto,
  ) {
    try {
      await this.movieRepository.update(id, {
        updatedAt: new Date(),
        duration,
        genre,
        release_date,
        title,
      });
      return {
        message: 'Filme atualizado',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException('Filme não encontrado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<MovieResposeRemoveDto> {
    try {
      const movie = await this.movieRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });
      if (movie) {
        await this.movieRepository.remove(movie);
        await this.redisService.delValue(movie.user.id);
        return {
          message: 'Filme removido',
          statusCode: HttpStatus.OK,
        };
      } else {
        throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
