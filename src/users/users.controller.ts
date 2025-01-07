import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import { RolesGuard } from '../guards/roles.guard';
import { Authorization } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersDto } from './dto/createUsers.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Get()
  @UseGuards(Authorization, RolesGuard)
  @HttpCode(HttpStatus.OK)
  getAllUsers() {
    try {
      return this.usersService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Users not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // @Get('profile/images')
  // @UseGuards(Authorization)
  // @HttpCode(HttpStatus.OK)
  // getUserImages() {
  //   return 'Este endpoint retorna el perfil del usuario';
  // }

  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Get('coffee')
  getCoffee() {
    try {
      throw new Error();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.I_AM_A_TEAPOT,
          error: 'Wrong coffee information'
        },
        HttpStatus.I_AM_A_TEAPOT,
      );
    }
  }


  @Put(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UsersDto) {
   try {
    return this.usersService.updateUser(id, user)
   } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `User with id ${id} was not found`
      },
      HttpStatus.NOT_FOUND
    );
   }
  }

  @Delete(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.usersService.deleteUser(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} was not found`
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get(':id')
  @UseGuards(Authorization)
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.usersService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} was not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
