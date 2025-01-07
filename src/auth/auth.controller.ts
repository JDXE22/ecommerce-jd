import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUsersDTO } from '@entities/users/dto/createUsers.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() loginDTO: LoginUserDto) {
    try {
      return this.authService.signIn(loginDTO);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There was an issue with the credentials, please check and try again`
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('signup')
  signup(@Body() user: CreateUsersDTO) {
    try {
      return this.authService.signUp(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `There was an issue with the user information`
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
