import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Authorization } from 'src/guards/auth.guard';

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
    return 'No se hacer cafe, soy una tetera';
  }

  @Get('message')
  getMessage(@Res() response: Response) {
    response.status(200).send('Este es un mensaje');
  }

  @Get('request')
  getRequest(@Req() request: Request) {
    console.log(request);
  }

  @Get(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userDTO) {
    return this.usersService.create(userDTO)
  }

  @Put(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  updateUser(id: number) {
    return this.usersService.updateUser(id)
  }

  @Delete(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  deleteUser(id: number) {
    return this.usersService.deleteUser(id)
  }
}
