import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { LogMiddleware } from './middlewares';
// import { AuthMiddleware } from './middlewares/auth.middleware';
import {
  BcryptService,
  JWTService,
  LoggerService,
  RedisService,
} from './services';
import { UserModule } from './user';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [UserModule, DatabaseModule, MovieModule],
  controllers: [],
  providers: [
    LoggerService,
    BcryptService,
    RedisService,
    JWTService,
    // AuthMiddleware,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
