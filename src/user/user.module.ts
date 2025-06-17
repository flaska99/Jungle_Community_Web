import { Module } from '@nestjs/common';
import { User } from './Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Post } from 'src/post/Entities/post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
