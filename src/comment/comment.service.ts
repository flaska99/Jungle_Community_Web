import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        private userRepository : Repository<User>,
        @InjectRepository(Post)
        private postRepository : Repository<Post>,
        private readonly notificationService : NotificationService,
    ) {}

    async create(createCommentDto : CreateCommentDto,
         user_id : string) : Promise<Comment> {

        const user = await this.userRepository.findOne( { where : { id : user_id } } );
        if(!user) throw new UnauthorizedException('세션 만료 or 존재하지 않는 유저');

        const post = await this.postRepository.findOne({ 
            where : { id : createCommentDto.postId }, 
            relations: ['author'] 
        });

        if(!post) throw new NotFoundException("페이지를 찾을 수 없습니다.");

        const comment = this.commentRepository.create({
            content : createCommentDto.content,
            author : user,
            post : post
        });

        this.commentRepository.save(comment)
        const postAuthorId = post.author.id;

        if(post.author.id !== user.id){
            await this.notificationService.notify(
                postAuthorId,
                post,
                comment,
                `${user.user_name} 님이 댓글을 남겼습니다 !`
            );
        }
    }

    async remove (id : string, user_id : string) : Promise<void> { 
        const user = await this.userRepository.findOne( { where : { id : user_id } } );
        if(!user) throw new UnauthorizedException("세션만료 or 존재하지 않는 유저");

        const comment = await this.commentRepository.findOne({
            where : { id },
            relations : [ 'author' ],
        });

        if(!comment) throw new UnauthorizedException("comment not found !");

        if(comment.author.id !== user.id){
            throw new ForbiddenException("유저에 해당하는 댓글이 아닙니다.");
        }
        
        await this.commentRepository.remove(comment);
    }
}
