import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
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
    it('should create a new user', async () => {
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

    it('should return 409 if email already exists', async () => {
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
});
