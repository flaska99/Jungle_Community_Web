import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}

