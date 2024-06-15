import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repositorys';
import { BcryptService, JWTService, RedisService } from '../services';
import { UserService } from '../user/user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AuthService,
    UserRepository,
    BcryptService,
    RedisService,
    JWTService,
    UserService,
  ],
})
export class AuthModule {}
