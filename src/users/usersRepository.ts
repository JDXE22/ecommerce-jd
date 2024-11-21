import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUsersDTO } from './dto/createUsers.dto';

@Injectable()
export class UsersRepository {
  private  users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main St, Springfield',
      phone: '123-456-7890',
      country: 'USA',
      city: 'Springfield',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'password456',
      address: '456 Elm St, Shelbyville',
      phone: '098-765-4321',
      country: 'USA',
      city: 'Shelbyville',
    },
    {
      id: 3,
      email: 'alice.wonderland@example.com',
      name: 'Alice Wonderland',
      password: 'password789',
      address: '789 Oak St, Metropolis',
      phone: '555-123-4567',
    },
  ];

  async getUsers() {
    return this.users.map(({ password, ...user }) => user);
  }

  async getById(id: number) {
    const userFiltered = this.users.find((user) => user.id === id);
    if (userFiltered) {
      const { password, ...userWithNoPassword } = userFiltered;
      return userWithNoPassword;
    }
    return null;
  }

  async create(newUser){
    const id = this.users.length + 1
    this.users = [...this.users, {id, ...newUser}]
    return {id, newUser}
    
  }

  async updateUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  
  async deleteUser(id: number){
    return this.users.find((user) => user.id === id);
  }


  signIn(loginDTO: LoginDTO) {
    const users = this.users.find((user) => user.email === loginDTO.email);

    if (!loginDTO) {
      throw new UnauthorizedException('Wrong email or password');
    }
    
    if (!users || users.password !== loginDTO.password) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return loginDTO
  }
}
