import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { UsersRepository } from 'src/users/usersRepository';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository){}

    signIn(loginDTO: LoginDTO){
        const user = this.usersRepository.signIn(loginDTO)
        return user
    }
}
