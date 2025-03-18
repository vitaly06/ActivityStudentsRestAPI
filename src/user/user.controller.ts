import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("profile")
  async profileForUser(@Body() data: {access_token: string}){
    return this.userService.profileForUser(data.access_token)
  }

}
