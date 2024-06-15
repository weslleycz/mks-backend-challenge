import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create.movie.dto';
import { UpdateMovieDto } from './dtos/update.movie.dto';
import { MovieRepository } from './repositorys';
import { UserRepository } from '../user/repositorys/user.repository';
import { CreateResponseMovieDto } from './dtos/create-Response.user.dto';
import { AuthToken } from '../auth/dtos';
import { MovieEntity } from './entities';
import { MovieResposeRemoveDto } from './dtos/remove.movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly userRepository: UserRepository,
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

  async findAll({ id }: AuthToken): Promise<MovieEntity[]> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['movies'],
    });
    return user.movies;
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

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: string): Promise<MovieResposeRemoveDto> {
    try {
      const movie = await this.movieRepository.findOne({
        where: {
          id,
        },
      });
      if (movie) {
        await this.movieRepository.delete(id);
        return {
          message: 'Filme removido',
          statusCode: HttpStatus.OK,
        };
      } else {
        throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
