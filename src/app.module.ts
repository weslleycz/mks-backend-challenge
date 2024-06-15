import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { LogMiddleware } from './middlewares';
import {
  BcryptService,
  JWTService,
  LoggerService,
  RedisService,
} from './services';
import { UserModule } from './user';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DatabaseModule, MovieModule, AuthModule],
  controllers: [],
  providers: [LoggerService, BcryptService, RedisService, JWTService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
