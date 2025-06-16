import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '유저 ID', minLength: 4, maxLength: 15 })
  @IsNotEmpty()
  @Length(4, 15)
  user_id: string;

  @ApiProperty({ description: '유저 이름', minLength: 2, maxLength: 5 })
  @IsNotEmpty()
  @Length(2, 5)
  user_name: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '정글 기수' })
  @IsNotEmpty()
  jungleGrade: string;
}
