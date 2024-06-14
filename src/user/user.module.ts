import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository';
import { BcryptService, JWTService, RedisService } from 'services';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    BcryptService,
    JWTService,
    RedisService,
  ],
})
export class UserModule {}
