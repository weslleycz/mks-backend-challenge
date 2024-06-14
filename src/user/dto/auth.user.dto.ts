import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'joaosilva@example.com',
  })
  @IsString()
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email: string;

  @ApiProperty({
    description:
      'Senha para a conta do usuário. Deve conter pelo menos 9 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
    example: 'SenhaForte123@',
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
