import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { Post } from 'src/post/Entities/post.entity';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationGateway : NotificationGateway){}

    notify(userId: string, post : Post, message: string){
        this.notificationGateway.sendNotification(userId, post, message);
    }
}
