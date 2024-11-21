import { Injectable } from '@nestjs/common';
import { UsersRepository } from './usersRepository';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository){}

    async getAllUsers(){
        return this.usersRepository.getUsers()
    }

    async getUserById(id: number){
        return this.usersRepository.getById(id)
    }

    async create(user){
        return this.usersRepository.create(user)
    }


    deleteUser(id:number){
        return this.usersRepository.deleteUser(id)
    }

    updateUser(id:number){
        return this.usersRepository.updateUser(id)
    }
}
