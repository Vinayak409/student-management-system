import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  createUser(user: User) {
    return this.userModel.create({ ...user });
  }

  loginUser(user: User) {
    return this.userModel.findOne({
      where: { email: user.email, password: user.password },
    });
  }
}
