import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/Entities/comment.entity';
import { CommentService } from 'src/comment/comment.service';
import { CommentController } from 'src/comment/comment.controller';
import { User } from 'src/user/Entities/user.entity';
import { Post } from 'src/post/Entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
