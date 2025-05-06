import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('adminProfile')
  async profileForUser(@Body() data: { access_token: string }) {
    return this.userService.profileForAdmin(data.access_token);
  }

  @Get('allUsers')
  async getAllUsers() {
    return this.userService.allUsers();
  }

  @Get('userProfile/:id')
  async getUserProfile(@Param('id') id: number) {
    return this.userService.getUserProfile(id);
  }
}
