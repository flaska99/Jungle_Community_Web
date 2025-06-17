import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
import { Post } from "src/post/Entities/post.entity";
import { Comment } from "src/comment/Entities/comment.entity";
import { PostView } from "src/post-view/entities/post-view.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id : string;

    @IsNotEmpty()
    @Column()
    @Length(2, 5)
    user_name : string;

    @IsNotEmpty()
    @Column()
    jungleGrade : string;

    @IsNotEmpty()
    @Column({ unique: true })
    @Length(4, 15)
    user_id: string;

    @IsNotEmpty()
    @Column()
    password: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];
}