import { Injectable } from '@nestjs/common';
import { MovieEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MovieRepository extends Repository<MovieEntity> {
  constructor(private dataSource: DataSource) {
    super(MovieEntity, dataSource.createEntityManager());
  }
}
