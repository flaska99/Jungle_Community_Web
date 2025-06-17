import { Controller, Post as HttpPost, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './Entities/user.entity';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';
import { Post } from 'src/post/Entities/post.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @HttpPost('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('userinfo')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req) : Promise<number> {
    return this.userService.countMyPost(req.user.sub);
  }

  @Get('mypage')
  @UseGuards(JwtAuthGuard)
  async getMyPage(@Request() req){
    return this.userService.findMyPost(req.user.sub);
  }
}
