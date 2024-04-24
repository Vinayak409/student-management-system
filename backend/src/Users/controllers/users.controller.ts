import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from '../models/users.model';
import { UserService } from '../services/users.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() user: User) {
    const newUser = this.userService.createUser(user);
    return newUser;
  }

  @Post('login')
  async loginUser(@Body() user: User, @Res() res: Response) {
    res.status(200);
    return res.json(await this.userService.loginUser(user));
  }
}
