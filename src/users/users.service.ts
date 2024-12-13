import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDTO } from './dto/createUsers.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAllUsers(){
    return (await this.usersRepository.find()).map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }



  async getUserById(id: string): Promise<
    | (Omit<User, 'password' | 'orders'> & {
        orders: { id: string; date: Date }[];
      })
    | null
  > {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) {
      throw new Error(`No users`);
    }
    const { password, orders, ...userWithoutPassword } = user;

    const filteredOrders = orders.map((order) => ({
      id: order.id,
      date: order.date,
    }));

    console.log('🚀 ~ UsersService ~ getUserById ~ userFound:', user);
    return { ...userWithoutPassword, orders: filteredOrders };
  }

  async findOneUserBy(id: string) {
    const userFound = await this.usersRepository.findOne({ where: { id } });
    console.log(userFound);
    return userFound;
  }

  async save(user: CreateUsersDTO){
    user.createdAt = new Date()
    return await this.usersRepository.save(user)
  }

  // async create(user: Omit<User, 'id' | 'orders'>) {
  //   const date = new Date();
  //   user.createdAt = date;
  //   const newUser = this.usersRepository.save(user);
  //   return newUser;
  // }

  async deleteUser(id: string) {
    this.usersRepository.delete(id);
    return { id };
  }

  async updateUser(id: string, user: Omit<User, 'id' | 'orders'>) {
    return this.usersRepository.update(id, user);
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

}
