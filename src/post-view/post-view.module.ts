import { Module } from '@nestjs/common';
import { PostViewService } from './post-view.service';
import { PostViewController } from './post-view.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/Entities/post.entity';
import { User } from 'src/user/Entities/user.entity';
import { PostView } from './entities/post-view.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { PostViewCleanupService } from './post-view-cleanUp.service';

@Module({
  imports : [TypeOrmModule.forFeature([PostView, Post, User])],
  controllers: [PostViewController],
  providers: [PostViewService, PostViewCleanupService],
})
export class PostViewModule {}
