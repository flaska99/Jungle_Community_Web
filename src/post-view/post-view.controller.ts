import { Controller, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { PostViewService } from './post-view.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.authGuard';

@Controller('post-view')
export class PostViewController {
  constructor(private readonly postViewService: PostViewService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':postId/view')
  async increaseView(@Param('postId') postId : string, @Request() req){
    return this.postViewService.increaseView(req.user.userId, postId);
  }
}
