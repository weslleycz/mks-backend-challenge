import { ApiProperty } from '@nestjs/swagger';

export class UserExistsErrResponseDto {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;
  @ApiProperty({
    example:
      'Não é possível criar uma conta porque esse e-mail já está associado a outra conta.',
  })
  message: string;
}
