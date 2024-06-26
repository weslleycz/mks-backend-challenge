import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @Column()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  release_date: string;

  @Column()
  @ApiProperty()
  genre: string;

  @Column()
  @ApiProperty()
  duration: string;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.movies)
  user: UserEntity;
}
