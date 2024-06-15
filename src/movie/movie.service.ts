import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create.movie.dto';
import { UpdateMovieDto } from './dtos/update.movie.dto';
import { MovieRepository } from './repositorys';
import { UserRepository } from '../user/repositorys/user.repository';
import { CreateResponseMovieDto } from './dtos/create-Response.user.dto';

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
      console.log(error);
      throw new HttpException(
        'Não foi possível criar o filme.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all movie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
