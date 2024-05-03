import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from '../models/users.model';
import { UserService } from '../services/users.service';
import { Response } from 'express';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() userDto: UserDto) {
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }


  @Post('login')
  async loginUser(@Body() userDto: UserDto, @Res() res: Response) {
    // res.status(200);
    return res.json(await this.userService.loginUser(userDto));
  }
}
