import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Authorization } from 'src/guards/auth.guard';
import { User } from './entities/user.entity';
import { CreateUsersDTO } from './dto/createUsers.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('profile')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  getUserProfile() {
    return 'Este endpoint retorna el perfil del usuario';
  }

  @Get('profile/images')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  getUserImages() {
    return 'Este endpoint retorna el perfil del usuario';
  }

  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Get('coffee')
  getCoffee() {
    return 'I dont know how to make coffee, I am a teapot';
  }

  @Get('message')
  getMessage(@Res() response: Response) {
    response.status(200).send('Este es un mensaje');
  }

  @Get('request')
  getRequest(@Req() request: Request) {
    console.log(request);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userDTO: CreateUsersDTO) {
    return this.usersService.create(userDTO)
  }

  @Put(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id', ParseUUIDPipe) id:string, @Body()user ) {
    return this.usersService.updateUser(id, user)
  }

  @Delete(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id)
  }

  @Get(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById((id));
  }
}
