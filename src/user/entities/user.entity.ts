import { ApiProperty } from '@nestjs/swagger';
import { MovieEntity } from '../../movie/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @Column()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => MovieEntity, (movie) => movie.user)
  movies: MovieEntity[];
}
