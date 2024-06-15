import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dtos/auth.dto';
import { AuthDtoResponse } from '../auth/dtos/authResponse.dto';
import { BcryptService, JWTService, RedisService } from '../services';
import {
  CreateUserDto,
  CreateUserResponseDto,
  GetAllResponseDto,
  GetUserResponseDto,
  UpdateUserDto,
} from './dtos';
import { UpdateResponse } from './dtos/update-Response.use.dto';
import { UserRepository } from './repositorys';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly redisService: RedisService,
    private readonly jWTService: JWTService,
    private readonly authService: AuthService,
  ) {}
  async create(data: CreateUserDto): Promise<CreateUserResponseDto> {
    const userExists = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!userExists) {
      const hashPassword = await this.bcryptService.hashPassword(data.password);
      const user = await this.userRepository.save({
        email: data.email,
        name: data.name,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const token = await this.jWTService.login(user.id, '72h');
      await this.redisService.delValue('users');
      return {
        message: 'Usuário criado com sucesso!',
        statusCode: HttpStatus.OK,
        token,
      };
    } else {
      throw new HttpException(
        'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAll(): Promise<GetAllResponseDto> {
    const usersCache = await this.redisService.getValue('users');
    if (usersCache) {
      return JSON.parse(usersCache);
    } else {
      const usersBD = await this.userRepository.find({
        select: ['createdAt', 'email', 'id', 'name', 'updatedAt'],
      });
      await this.redisService.setValue('users', JSON.stringify(usersBD), 7200);
      return {
        statusCode: HttpStatus.OK,
        message: 'Lista de usuários recuperada com sucesso.',
        users: usersBD,
      };
    }
  }

  async getById(id: string): Promise<GetUserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        select: ['createdAt', 'email', 'id', 'name', 'updatedAt'],
      });
      if (user) {
        return {
          ...user,
          statusCode: HttpStatus.OK,
        };
      } else {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async update(data: UpdateUserDto): Promise<UpdateResponse> {
    const { id, email, name, password } = data;
    try {
      if (!password) {
        await this.userRepository.update(id, {
          email,
          name,
          updatedAt: new Date(),
        });
      } else {
        const hashPassword = await this.bcryptService.hashPassword(
          data.password,
        );
        await this.userRepository.update(id, {
          email,
          name,
          password: hashPassword,
          updatedAt: new Date(),
        });
      }
      await this.redisService.delValue('users');
      return {
        message: 'Usuario atualizado',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Não foi possível atualizar o usuário.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(data: AuthDto): Promise<AuthDtoResponse> {
    return await this.authService.login(data);
  }
}
