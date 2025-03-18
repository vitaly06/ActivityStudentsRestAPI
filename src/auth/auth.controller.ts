import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { addUser, LoginUser } from './auth.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  @Post('login')
    async login(
        @Body() data: LoginUser,
        @Res({ passthrough: true }) res: Response,
    ) {
      console.log(data)
        const result = await this.authService.login(data);

        res.cookie('access_token', result.access_token, {
            httpOnly: false, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            sameSite: 'strict', // Защита от CSRF
        });

        return { message: 'Успешный вход' };
    }

  @Post("register")
  async registerUser(@Body() data: addUser): Promise<User>{
    return this.authService.register(data)
  }
}
