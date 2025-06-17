import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "src/user/Entities/user.entity";
import { Category } from "src/category/Entities/category.entity";
import { Comment } from "src/comment/Entities/comment.entity";

@Entity()
export class Post{
    @PrimaryGeneratedColumn({ type : 'bigint'})
    id : string;

    @Column()
    title : string;

    @Column('text')
    content : string;

    @ManyToOne(() => User, (user) => user.posts, {eager : true})
    author : User;

    @ManyToOne(() => Category, (category) => category.posts, { eager : true })
    category: Category;

    @OneToMany(() => Comment, (comment) => comment.post, { cascade : true})
    comments : Comment[];
    
    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updateAt : Date;
}