import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BcryptService, JWTService } from '../services';
import { UserRepository } from '../user/repositorys';
import { AuthDto, AuthDtoResponse } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jWTService: JWTService,
  ) {}
  async login(data: AuthDto): Promise<AuthDtoResponse> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException(
        'O e-mail não está cadastrado. Por favor, verifique se está correto.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await this.bcryptService.comparePasswords(password, user.password)) {
      const token = await this.jWTService.login(user.id, '72h');
      return {
        message: 'Autenticação bem-sucedida.',
        statusCode: HttpStatus.OK,
        token,
      };
    } else {
      throw new HttpException(
        'Senha incorreta. Tente novamente.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
