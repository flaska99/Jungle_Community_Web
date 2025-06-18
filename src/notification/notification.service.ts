import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { Post } from 'src/post/Entities/post.entity';
import { Comment } from 'src/comment/Entities/comment.entity';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationGateway : NotificationGateway){}

    notify(userId: string, post : Post, comment : Comment, message: string){
        this.notificationGateway.sendNotification(userId, post, comment, message);
    }
}
