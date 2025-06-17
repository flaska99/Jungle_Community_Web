import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/Entities/category.entity';
import { Post } from './Entities/post.entity';
import { User } from 'src/user/Entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Post, User, Category])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
