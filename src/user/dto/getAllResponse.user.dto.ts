import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'user/entities';

type UserOmitPassword = Omit<UserEntity, 'password'>;

class UserOmitPasswordClass implements UserOmitPassword {
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
    example: 200,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    example: 'Lista de usuários recuperada com sucesso.',
  })
  message: string;

  @ApiProperty({
    type: [UserOmitPasswordClass],
  })
  users: Array<UserOmitPassword>;
}
