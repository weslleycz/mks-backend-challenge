import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities';

type UserOmitPassword = Omit<UserEntity, 'password'>;

export class UserOmitPasswordDto implements UserOmitPassword {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class GetAllResponseDto {
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    example: 'Lista de usuários recuperada com sucesso.',
  })
  message: string;

  @ApiProperty({
    type: [UserOmitPasswordDto],
  })
  users: Array<UserOmitPassword>;
}

export class GetUserResponseDto implements UserOmitPassword {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: HttpStatus;
}

export class GetUserErrResponseDto {
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    example: 'Usuário não encontrado',
  })
  message: string;
}
