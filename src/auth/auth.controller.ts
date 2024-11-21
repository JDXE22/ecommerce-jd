import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    getAll(){
        return `This returns all the products`
    }

    @Post('signin')
    signin(@Body() loginDTO: LoginDTO){
        return this.authService.signIn(loginDTO)
    }
}
