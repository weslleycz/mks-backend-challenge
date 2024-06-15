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
  name: string;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.movie)
  user: string;
}
