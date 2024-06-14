import { ApiProperty } from '@nestjs/swagger';

export class AuthDtoResponse {
  @ApiProperty({
    description: 'Bearer token de autenticação',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  token: string;

  @ApiProperty({
    description: 'Mensagem de confirmação de login',
    example: 'Login realizado com sucesso',
  })
  message: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;
}
