import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserResponseDto,
  UserExistsErrResponseDto,
  GetAllResponseDto,
  GetUserResponseDto,
  GetUserErrResponseDto,
} from './dto';
import { UserService } from './user.service';
import { AuthUserDto } from './dto/auth.user.dto';
import { AuthUserDtoResponse } from './dto/authResponse.user.dto';
import { AuthErrUserDtoResponseNotFound } from './dto/authErrResponseNotFound.user.dto';
import { AuthErrUserDtoResponseUnauthorized } from './dto/authErrResponseUnauthorized.user.dto';

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
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os usuários.',
    type: GetAllResponseDto,
  })
  async getAll(): Promise<GetAllResponseDto> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por id' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do usuário.',
    type: GetUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: GetUserErrResponseDto,
  })
  async getById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<GetUserResponseDto> {
    return await this.userService.getById(id);
  }

  @Post('/auth')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Autenticação bem-sucedida.',
    type: AuthUserDtoResponse,
  })
  @ApiResponse({
    status: 404,
    description:
      'O e-mail não está cadastrado. Por favor, verifique se está correto.',
    type: AuthErrUserDtoResponseNotFound,
  })
  @ApiResponse({
    status: 401,
    description: 'Senha incorreta. Tente novamente.',
    type: AuthErrUserDtoResponseUnauthorized,
  })
  async auth(@Body() body: AuthUserDto): Promise<AuthUserDtoResponse> {
    return await this.userService.auth(body);
  }
}
