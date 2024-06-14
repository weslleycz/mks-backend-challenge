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
} from './dto';
import {
  GetAllResponseDto,
  GetUserResponseDto,
} from './dto/getAllResponse.user.dto';
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
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.create(createUserDto);
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
  async getById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<GetUserResponseDto> {
    return await this.userService.getById(id);
  }
}
