import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogMiddleware } from './middlewares';
import { LoggerService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
