import {  Controller, Get, Post as HttpPost, Body, Param, Delete, Patch, UseGuards, Request} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './Dto/create-post.dto';
import { UpdatePostDto } from './Dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';

@Controller('post')
export class PostController {
    constructor(private readonly postService : PostService) {}

    @UseGuards(JwtAuthGuard)
    @HttpPost()
    create (@Body() createPostDto : CreatePostDto, @Request() req){
        return this.postService.create(createPostDto, req.user.sub);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id : string){
        return this.postService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    return this.postService.update(id, updatePostDto, req.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.user.sub);
    }
}
