import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import { UserController } from "./controllers/users.controller";
import { UserService } from "./services/users.service";

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController]
})

export class UsersModule{}