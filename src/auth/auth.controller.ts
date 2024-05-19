import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './DTO/register-auth.dto';
import { LoginAuthDto } from './DTO/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() user: RegisterUserDto){
        return this.authService.register(user);
    }

    @Post('login')
    login(@Body() loginData: LoginAuthDto){
        // console.log('Client data: ', loginData);
        return this.authService.login(loginData);
    }


}
