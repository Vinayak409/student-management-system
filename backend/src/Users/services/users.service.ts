import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
``;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(userDto: UserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashedPassword;
    return this.userModel.create({ ...userDto });
  }

  async loginUser(userDto: UserDto) {
    const user = await this.userModel.findOne({
      where: { email: userDto.email },
    });

    if (user) {
      const isMatchPassword = await bcrypt.compare(
        userDto.password,
        user.password,
      );

      if (isMatchPassword) {
        return user;
      } else {
        console.log('Incorrect password');
        throw new BadRequestException('Incorrect credential');
      }
    } else {
      throw new BadRequestException('Incorrect credential');
    }
  }
}
