import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InterceptorAuth } from 'src/auth/interceptorAuth.middleware';
import {
  CreateUserDto,
  CreateUserResponseDto,
  GetAllResponseDto,
  GetUserErrResponseDto,
  GetUserResponseDto,
  UpdateUserDto,
  UserExistsErrResponseDto,
} from './dto';
import { UserService } from './user.service';
import {
  AuthDto,
  AuthDtoResponse,
  AuthErrDtoResponseNotFound,
  AuthErrDtoResponseUnauthorized,
} from 'src/auth/dto';
import { AuthTokenNotFound } from 'src/auth/dto/authTokenNotFound.dto';
import { AuthTokenUnauthorized } from 'src/auth/dto/authTokenUnauthorized.dto';
import { UpdateResponse } from './dto/updateResponse.use.dto';

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
    type: AuthDtoResponse,
  })
  @ApiResponse({
    status: 404,
    description:
      'O e-mail não está cadastrado. Por favor, verifique se está correto.',
    type: AuthErrDtoResponseNotFound,
  })
  @ApiResponse({
    status: 401,
    description: 'Senha incorreta. Tente novamente.',
    type: AuthErrDtoResponseUnauthorized,
  })
  async login(@Body() body: AuthDto) {
    return await this.userService.login(body);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar informações do usuário' })
  @UseInterceptors(InterceptorAuth)
  @ApiBearerAuth()
  @ApiResponse({
    status: 401,
    description: 'Token não fornecido',
    type: AuthTokenNotFound,
  })
  @ApiResponse({
    status: 401,
    description: 'Sessão expirada',
    type: AuthTokenUnauthorized,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado',
    type: UpdateResponse,
  })
  async update(@Body() body: UpdateUserDto): Promise<UpdateResponse> {
    return await this.userService.update(body);
  }
}
