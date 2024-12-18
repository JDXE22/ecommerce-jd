import { Body, Controller, Post } from '@nestjs/common';
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
    return this.authService.signIn(loginDTO);
  }

  @Post('signup')
  signup(@Body() user: CreateUsersDTO) {
    return this.authService.signUp(user);
  }
}
