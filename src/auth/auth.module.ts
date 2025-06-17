import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret : process.env.JWT_SECRET, // jwt 키 받아오기
      signOptions : {expiresIn: '1d'},
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports : [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
