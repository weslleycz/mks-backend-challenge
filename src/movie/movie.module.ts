import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './repositorys';
import { RedisService } from 'src/services';
import { AuthMiddleware } from '../auth/auth.middleware';
import { UserRepository } from './../user/repositorys';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, RedisService, UserRepository],
})
export class MovieModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/movie', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/movie/*', method: RequestMethod.ALL });
  }
}
