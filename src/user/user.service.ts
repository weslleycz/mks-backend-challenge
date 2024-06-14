import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto';
import { UserRepository } from './repository';
import { BcryptService, JWTService, RedisService } from 'services';
import { GetAllResponseDto } from './dto/getAllResponse.user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly redisService: RedisService,
    private readonly jWTService: JWTService,
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
      await this.redisService.setValue(JSON.stringify(usersBD), '2h');
      return {
        statusCode: HttpStatus.OK,
        message: 'Lista de usuários recuperada com sucesso.',
        users: usersBD,
      };
    }
  }
}