import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponseDto,
  UserExistsErrResponseDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description:
      'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
    type: UserExistsErrResponseDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }
}
