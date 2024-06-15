import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BcryptService, JWTService, RedisService } from '../services';
import { UserRepository } from './repositorys';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import * as dotenv from 'dotenv';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

dotenv.config();

@Module({
  controllers: [UserController],
  imports: [AuthModule],
  providers: [
    UserService,
    UserRepository,
    JWTService,
    RedisService,
    BcryptService,
    AuthService,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/user', method: RequestMethod.PATCH });
  }
}
