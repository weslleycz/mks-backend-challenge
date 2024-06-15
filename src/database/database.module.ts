import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
// import { Movie } from 'src/movies/entities/movie.entity';
import { UserEntity } from '../user/entities';
import { MovieEntity } from '../movie/entities';

dotenv.config();

@Module({
  imports: [
    process.env.NODE_ENV
      ? TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [UserEntity, MovieEntity],
          synchronize: true,
          logging: false,
        })
      : TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT as unknown as number,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          synchronize: true,
          logging: false,
          logger: 'file',
          entities: [UserEntity, MovieEntity],
        }),
  ],
})
export class DatabaseModule {}
