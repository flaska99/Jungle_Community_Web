import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/Entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
        private jwtservice : JwtService
    ) {}

    async validateUser(user_id : string, password : string) : Promise<User>{
        const user = await this.userRepository.findOne({where : {user_id}});
        if (!user) throw new UnauthorizedException('존재하지 않는 유저입니다.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('비밀번호가 틀렸습니다.');

        return user;
    }

    async login(user : User){
        const payload = { sub : user.id, user_id : user.user_id, user_name : user.user_name, jungle_grade : user.jungleGrade};
        return {
            access_token: this.jwtservice.sign(payload),
        };
    }


}
