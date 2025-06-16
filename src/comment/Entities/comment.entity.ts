import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';
import { Post } from 'src/post/Entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user, { eager: true })
  author: User;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
