import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: '댓글 내용'})
    content : string;

    @IsNotEmpty()
    @ApiProperty({ description : 'postId'})
    postId : string;
}