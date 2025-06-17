import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './Entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/Entities/user.entity';
import { Category } from 'src/category/Entities/category.entity';
import { CreatePostDto } from './Dto/create-post.dto';
import { UpdatePostDto } from './Dto/update-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository : Repository<Post>,
        @InjectRepository(User)
        private userRepository : Repository<User>,
        @InjectRepository(Category)
        private categoryRepository : Repository<Category>
    ) {}

    async create(createPostDto : CreatePostDto, user_id : string) : Promise<Post> {
        const category = await this.categoryRepository.findOne({ where : { id : createPostDto.categoryId }});
        if(!category) {
            throw new NotFoundException('Category 를 찾을 수 없습니다 ! ');
        }

        const user = await this.userRepository.findOne({ where : { id : user_id }})
        if(!user) throw new UnauthorizedException('세션 만료 or 존재하지 않는 유저');

        const post = this.postRepository.create({
            title : createPostDto.title,
            content : createPostDto.content,
            author : user,
            category : category,
        });

        return this.postRepository.save(post);
    }

    async findAll() : Promise<Post[]> {
        return this.postRepository.find({
            relations : ['author', 'category', 'comment']
        });
    }

    async findOne(id : string) : Promise<Post> {
        const post = await this.postRepository.findOne({
            where : { id },
            relations : ['author', 'category', 'comment'],
        });

        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    async update(id : string, updatePostDto : UpdatePostDto, user_id : string) : Promise<Post> {
        const user = await this.userRepository.findOne({ where : { id : user_id }});
        if(!user) throw new UnauthorizedException('세션 만료 or 존재하지 않는 유저');

        
        
        const post = await this.postRepository.findOne({
            where : { id },
            relations : ['author'],
        });

        if (!post) throw new NotFoundException('Post not found');
        if (post.author.id !== user.id) {
            throw new ForbiddenException('유저에 해당하는 포스트가 아닙니다 !');
        }

        Object.assign(post, updatePostDto);
        return this.postRepository.save(post);
    }

    async remove (id : string, user_id : string) : Promise<void> {

        const user = await this.userRepository.findOne({ where : { id : user_id }})
        if(!user) throw new UnauthorizedException('세션 만료 or 존재하지 않는 유저');

        const post = await this.postRepository.findOne ({
            where : { id },
            relations : [ 'author' ],
        });

        if(!post) throw new NotFoundException('Post not found');
        if (post.author.id !== user.id) {
            throw new ForbiddenException('유저에 해당하는 포스트가 아닙니다 ! ');
        }
        await this.postRepository.remove(post);
    }

    async findMainFeed(page : number, limit : number){
        const [data, total] = await this.postRepository.findAndCount({
            relations : ['author', 'category', 'comments'],
            order : { id : 'DESC'},
            take : limit,
            skip : (page - 1) * limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages
        };
    }

    async findByCategory(name: string, page: number, limit: number) {
    const category = await this.categoryRepository.findOne({ where: { name } });
    if (!category) {
        throw new NotFoundException('Category not found');
    }

    const [data, total] = await this.postRepository.findAndCount({
        where: { category: { id: category.id } },
        relations: ['author', 'category', 'comment'],
        order: { id: 'DESC' },
        take: limit,
        skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
        data,
        total,
        page,
        limit,
        totalPages
    };
}

}
