import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './Entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';
import { Post } from 'src/post/Entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository : Repository<Comment>,
        @InjectRepository(User)
        private userRepository : Repository<Comment>,
        @InjectRepository(Post)
        private postRepository : Repository<Post>,
        private readonly notificationService : NotificationService,
    ) {}

    async create(createCommentDto : CreateCommentDto,
         user_id : string) : Promise<Comment> {

        const user = await this.userRepository.findOne( { where : { id : user_id } } );
        if(!user) throw new UnauthorizedException('세션 만료 or 존재하지 않는 유저');

        const post = await this.postRepository.findOne( { where : { id : createCommentDto.postId } } );
        if(!post) throw new NotFoundException("페이지를 찾을 수 없습니다.");

        const comment = this.commentRepository.create({
            content : createCommentDto.content,
            author : user,
            post : post
        });

        const postAuthorId = post.author.id;

        await this.notificationService.notify(
            postAuthorId,
            `${user.author.user_name} 님이 댓글을 남겼습니다 !`
        );

        return this.commentRepository.save(comment);
    }
}
