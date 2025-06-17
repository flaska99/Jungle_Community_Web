import { Post } from "src/post/Entities/post.entity";
import { User } from "src/user/Entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['user', 'post'])
export class PostView {
    @PrimaryGeneratedColumn({ type : 'bigint' })
    id : string;

    @ManyToOne(() => User, { onDelete : 'CASCADE'})
    user : User;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    post: Post;

    @CreateDateColumn()
    createAt : Date;

    @Column({ default: 0 })
    views: number;
}