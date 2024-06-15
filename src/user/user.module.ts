import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BcryptService, JWTService, RedisService } from '../services';
import { UserRepository } from './repositorys';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from './../middlewares/auth.middleware';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JWTService,
    RedisService,
    BcryptService,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/user', method: RequestMethod.PATCH });
  }
}
