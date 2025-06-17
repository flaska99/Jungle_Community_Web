import { Controller, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { PostViewService } from './post-view.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';

@Controller('post-view')
export class PostViewController {
  constructor(private readonly postViewService: PostViewService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':postId/view')
  async increaseView(@Param('postId') postId : string, @Request() req){
    console.log(`유저 ${req.sub}가 소켓에 연결됨`);
    return this.postViewService.increaseView(req.sub, postId);
  }
}
