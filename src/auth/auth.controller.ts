import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    // return 'login'``
    return this.authService.login(loginUserDto);
  }
  
  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    // return 'registration' 
    return this.authService.registration(createUserDto);
  }

}
