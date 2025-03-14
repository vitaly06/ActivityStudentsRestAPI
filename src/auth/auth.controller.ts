import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { addUser, LoginUser } from './auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() data: addUser): Promise<User>{
    return this.authService.register(data)
  }

  @Post("login")
  async login(@Body() data: LoginUser){
    return this.authService.login(data)
  }
}
