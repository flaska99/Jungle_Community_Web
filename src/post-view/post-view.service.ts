import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostView } from './entities/post-view.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';
import { Post } from 'src/post/Entities/post.entity';

@Injectable()
export class PostViewService {
    constructor(
        @InjectRepository(PostView)
        private postViewRepository : Repository<PostView>,
        @InjectRepository(User)
        private userRepository : Repository<User>,
        @InjectRepository(Post)
        private postRepository : Repository<Post>
    ) {}

    async increaseView(userId : string, postId : string){
        const user = await this.userRepository.findOne( { where : { id : userId } } );
        if (!user) throw new NotFoundException('User not found');

        const post = await this.postRepository.findOne( { where : { id : postId } } );
        if (!post) throw new NotFoundException('Post not found');

        const existingView = await this.postViewRepository.findOne({
            where : { user : { id : userId }, post : { id : postId } }
        });

        if(!existingView){
            const view = this.postViewRepository.create({ user, post });
            await this.postViewRepository.save(view);

            await this.postRepository.increment({ id: postId }, 'views', 1);
            return {
                message : "true"
            };
        }

        return {
            message : "false"
        };
    }
}
