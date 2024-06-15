import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /user', () => {
    it('Deve criar um novo usuário', async () => {
      const createUserDto: CreateUserDto = {
        name: 'João Silva',
        email: 'joaosilva@example.com',
        password: 'SenhaForte123@',
        passwordConfirm: 'SenhaForte123@',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(HttpStatus.CREATED);
    });

    it('Deve retornar 409 se o e-mail já existir', async () => {
      const createUserDto: CreateUserDto = {
        name: 'João Silva',
        email: 'joaosilva@example.com',
        password: 'SenhaForte123@',
        passwordConfirm: 'SenhaForte123@',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('GET /user', () => {
    it('Deve listar todos os usuarios', async () => {
      const reg = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(reg.body.users.length > 0).toBe(true);
    });
  });

  describe('GET /user/id', () => {
    it('Deve retornar os detalhes de um usuário por ID válido.', async () => {
      const reg = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);
      expect(reg.body.users.length > 0).toBe(true);
      const userId = reg.body.users[0].id;
      await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(HttpStatus.OK);
    });

    it('Deve retornar 404 se o ID de usuário não for encontrado.', async () => {
      await request(app.getHttpServer())
        .get(`/user/e533c6c0-09ef-4df4-b7a9-9e51785d82d4`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('POST /user/auth', () => {
    it('Deve autenticar um usuário com credenciais válidas.', async () => {
      const authDto: AuthDto = {
        email: 'joaosilva@example.com',
        password: 'SenhaForte123@',
      };
      await request(app.getHttpServer())
        .post('/user/auth')
        .send(authDto)
        .expect(HttpStatus.CREATED);
    });
    it('Deve retornar 401 se o e-mail não estiver cadastrado.', async () => {
      const authDto: AuthDto = {
        email: 'joaositlva@example.com',
        password: 'SenhaForte123@',
      };
      await request(app.getHttpServer())
        .post('/user/auth')
        .send(authDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('Deve retornar 401 se a senha estiver incorreta.', async () => {
      const authDto: AuthDto = {
        email: 'joaosilva@example.com',
        password: '123443545@',
      };
      await request(app.getHttpServer())
        .post('/user/auth')
        .send(authDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('PATCH /user', () => {
    it('Deve atualizar as informações do usuário com um token de autenticação válido.', async () => {
      const updateUserDto = {
        name: 'teste',
      };
      const authDto: AuthDto = {
        email: 'joaosilva@example.com',
        password: 'SenhaForte123@',
      };
      const login = await request(app.getHttpServer())
        .post('/user/auth')
        .send(authDto)
        .expect(HttpStatus.CREATED);
      await request(app.getHttpServer())
        .patch('/user')
        .send(updateUserDto)
        .auth(login.body.token, { type: 'bearer' })
        .expect(HttpStatus.OK);
    });
    it('Deve retornar 401 se o token não for fornecido', async () => {
      const updateUserDto = {
        name: 'teste',
      };
      await request(app.getHttpServer())
        .patch('/user')
        .send(updateUserDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
