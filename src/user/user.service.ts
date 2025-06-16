import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      // TypeORM의 에러코드가 1062이면 unique 제약조건 위반 (MySQL 기준)
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException('이미 존재하는 아이디 또는 닉네임입니다.');
      }
      throw new InternalServerErrorException();
    }
  }
}

