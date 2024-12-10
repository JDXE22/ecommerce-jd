import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUsersDTO } from '@entities/users/dto/createUsers.dto';
import { RolesGuard } from '@entities/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Rol } from './roles/roles.enum';
import { Request } from 'express';
import { Authorization } from '@entities/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() loginDTO: LoginUserDto) {
    return this.authService.signIn(loginDTO);
  }

  @Post('signup')
  signup(@Body() user: CreateUsersDTO) {
    return this.authService.signUp(user);
  }

  
}
