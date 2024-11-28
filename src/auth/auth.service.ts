import { UsersService } from '@entities/users/users.service';
import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { LoginUserDto } from './dto/loginUser.dto';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService){}

    signIn(loginDTO: LoginUserDto){
        return this.usersService.signIn(loginDTO)
    }
}
