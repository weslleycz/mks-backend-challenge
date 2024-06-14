import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Match } from '../../decorators';

export class UpdateUserDto {
  @ApiProperty({
    description:
      'Senha para a conta do usuário. Deve conter pelo menos 9 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
    example: 'SenhaForte123@',
  })
  @IsString()
  @MinLength(9, { message: 'A senha deve ter pelo menos 9 caracteres' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',
  })
  password: string;

  @ApiProperty({
    description:
      'Confirmação da senha para a conta do usuário. Deve ser igual à senha fornecida.',
    example: 'SenhaForte123@',
  })
  @IsString()
  @IsNotEmpty({ message: 'A confirmação da senha não pode estar vazia' })
  @Match('password', {
    message: 'As senhas não coincidem',
  })
  passwordConfirm: string;
}
