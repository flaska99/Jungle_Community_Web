import { Controller, Param, Patch, Request } from '@nestjs/common';
import { PostViewService } from './post-view.service';

@Controller('post-view')
export class PostViewController {
  constructor(private readonly postViewService: PostViewService) {}

  @Patch(':postId/view')
  async increaseView(@Param('postId') postId : string, @Request() req){
    const user_id = req.user.sub;
    return this.postViewService.increaseView(user_id, postId);
  }
}
