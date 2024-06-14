import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogMiddleware } from './middlewares';
import {
  LoggerService,
  RedisService,
  BcryptService,
  JWTService,
} from './services';
import { UserModule } from './user';
import { DatabaseModule } from './database';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [],
  providers: [LoggerService, BcryptService, RedisService, JWTService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
