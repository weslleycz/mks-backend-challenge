import { ApiProperty } from '@nestjs/swagger';
import { GlobalErrorDto } from '../../exceptions/globalErrorDto';

export class UserExistsErrResponseDto extends GlobalErrorDto {
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
