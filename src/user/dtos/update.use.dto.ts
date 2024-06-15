import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsString()
  @IsOptional({ message: 'O nome não pode estar vazio' })
  name: string;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joaosilva@example.com',
  })
  @IsString()
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @IsOptional({ message: 'O e-mail não pode estar vazio' })
  email: string;

  @ApiProperty({
    description:
      'Senha para a conta do usuário. Deve conter pelo menos 9 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
    example: 'SenhaForte123@',
  })
  @IsString()
  @MinLength(9, { message: 'A senha deve ter pelo menos 9 caracteres' })
  @IsOptional()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',
  })
  password: string;

  id: string;
}
