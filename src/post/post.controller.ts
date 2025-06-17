import {  Controller, Get, Post as HttpPost, Body, Param, Delete, Patch, UseGuards, Request, Query} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './Dto/create-post.dto';
import { UpdatePostDto } from './Dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';

@Controller('post')
export class PostController {
    constructor(private readonly postService : PostService) {}

    @UseGuards(JwtAuthGuard)
    @HttpPost('post-create')
    create (@Body() createPostDto : CreatePostDto, @Request() req){
        return this.postService.create(createPostDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('main')
    findMainFeed(
        @Query('page') page : string,
        @Query('limit') limit : string
    ){
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = 10;

        return this.postService.findMainFeed(pageNum, limitNum);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':category')
    findCategoryFeed(
        @Param('category') category : string,
        @Query('page') page : string,
        @Query('limit') limit : string
    ) {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = 10;

        return this.postService.findByCategory(category, pageNum, limitNum);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id : string){
        return this.postService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    return this.postService.update(id, updatePostDto, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.user.userId);
    }
}
