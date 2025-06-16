import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('login')
    async login(@Body() loginDto : LoginDto) {
        const user = await this.authService.validateUser(loginDto.user_id, loginDto.password);
        return this.authService.login(user);
    }
}
