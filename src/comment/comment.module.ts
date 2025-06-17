import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './Entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from 'src/user/Entities/user.entity';
import { Post } from 'src/post/Entities/post.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post]), NotificationModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}

