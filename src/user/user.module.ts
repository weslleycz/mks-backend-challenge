import { Module } from '@nestjs/common';
// import { InterceptorAuth } from 'src/auth/interceptorAuth.middleware';
import { BcryptService, JWTService, RedisService } from '../services';
import { UserRepository } from './repositorys';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
export class UserModule {}
