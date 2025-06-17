import { Controller, Query, Request, UseGuards, Post as HttpPost, Body, Delete, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService : CommentService){}

    @UseGuards(JwtAuthGuard)
    @HttpPost('create') 
    async create(
        @Body() createCommentDto : CreateCommentDto,
        @Request() req
    ) 
    {
        return this.commentService.create(createCommentDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id : string, @Request() req){
        return this.commentService.remove(id, req.user.userId);
    }
}
