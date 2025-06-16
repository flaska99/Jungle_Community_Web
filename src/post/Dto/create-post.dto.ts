import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description : '포스트 제목'})
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({description : '포스트 내용'})
    content: string;

    @IsInt()
    @ApiProperty({description : '카테고리 id (id 값은 bigInt로 string)'})
    categoryId : string;
}