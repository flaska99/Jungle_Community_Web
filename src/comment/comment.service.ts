import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './Entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';
import { Post } from 'src/post/Entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository : Repository<Comment>,
        @InjectRepository(User)
        private userRepository : Repository<Comment>,
        @InjectRepository(Post)
        private postRepository : Repository<Post>
    ) {}

    async create(createCommentDto : CreateCommentDto,
         user_id : string, post_id : string) : Promise<Comment> {

        const user = await this.userRepository.findOne( { where : { id : user_id } } );
        if(!user) throw new UnauthorizedException('세션 만료 or 존재하지 않는 유저');

        const post = await this.postRepository.findOne( { where : { id : post_id } } );
        if(!post) throw new NotFoundException("페이지를 찾을 수 없습니다.");

        const comment = this.commentRepository.create({
            content : createCommentDto.content,
            author : user,
            post : post
        });

        return this.commentRepository.save(comment);
    }
}
