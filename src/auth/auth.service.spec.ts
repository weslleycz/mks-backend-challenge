import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService, JWTService } from '../services';
import { UserRepository } from '../user/repositorys';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Partial<UserRepository>;
  let bcryptService: Partial<BcryptService>;
  let jwtService: Partial<JWTService>;

  beforeEach(async () => {
    userRepository = {
      findOne: jest.fn(),
    };

    bcryptService = {
      comparePasswords: jest.fn(),
    };

    jwtService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: userRepository },
        { provide: BcryptService, useValue: bcryptService },
        { provide: JWTService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Deve lançar uma exceção se o usuário não for encontrado', async () => {
    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'password',
    };

    (userRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(authService.login(authDto)).rejects.toThrow(
      new HttpException(
        'O e-mail não está cadastrado. Por favor, verifique se está correto.',
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });

  it('Deve lançar uma exceção se a senha estiver incorreta', async () => {
    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    };

    (userRepository.findOne as jest.Mock).mockResolvedValue(user);
    (bcryptService.comparePasswords as jest.Mock).mockResolvedValue(false);

    await expect(authService.login(authDto)).rejects.toThrow(
      new HttpException(
        'Senha incorreta. Tente novamente.',
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });

  it('Deve retornar um token se a autenticação for bem-sucedida', async () => {
    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'correctpassword',
    };
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword',
    };
    const token = 'jwt.token.here';

    (userRepository.findOne as jest.Mock).mockResolvedValue(user);
    (bcryptService.comparePasswords as jest.Mock).mockResolvedValue(true);
    (jwtService.login as jest.Mock).mockResolvedValue(token);

    const result = await authService.login(authDto);

    expect(result).toEqual({
      message: 'Autenticação bem-sucedida.',
      statusCode: HttpStatus.OK,
      token,
    });
  });
});
