import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from './roles/roles.enum';
import { UsersService } from '@entities/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDTO: LoginUserDto) {
    const dbUser = await this.usersService.findUserByEmail(loginDTO.email);
    if (!dbUser) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatching = await bcrypt.compare(
      loginDTO.password,
      dbUser.password,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid credentials');
    }
    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
      roles: [dbUser.isAdmin ? Rol.admin : Rol.user],
    };

    const token = this.jwtService.sign(userPayload);
    return { success: 'User logged in successfully', token };
  }

  async signUp(user: Omit<User, 'id' | 'orders'>) {
    const dbUser = await this.usersService.findUserByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed');
    }

    await this.usersService.save({
      ...user,
      password: hashedPassword,
    });

    const { password, ...userwithOutPassword } = user;

    return { userwithOutPassword };
  }
}
