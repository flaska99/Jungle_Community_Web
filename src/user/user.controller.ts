import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './Entities/user.entity';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('userinfo')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req) : Promise<number> {
    return this.userService.findMyPost(req.user.sub);
  }
}
