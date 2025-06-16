import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '유저 ID' })
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  password: string;
}