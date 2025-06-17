import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/post/Entities/post.entity';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository : Repository<Post>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...rest } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ ...rest, password: hashedPassword });

        try {
        return await this.userRepository.save(user);
        } catch (error: any) {
        if (error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062) {
            throw new ConflictException('이미 존재하는 아이디 또는 닉네임입니다.');
        }
        throw new InternalServerErrorException();
        }
    }

    async findMyPost(user_id : string) : Promise<number> {
        const count = this.postRepository.count({
            where : { author : { id : user_id }}
        });

        return count;
    }

}

