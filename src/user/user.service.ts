import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto';
import { UserRepository } from './repository';
import { BcryptService, JWTService } from 'services';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
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
      });
      const token = await this.jWTService.login(user.id, '72h');
      return {
        message: 'Usuário criado com sucesso!',
        statusCode: 200,
        token,
      };
    } else {
      throw new HttpException(
        'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
