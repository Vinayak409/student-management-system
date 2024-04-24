import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "./students.model";
import { StudentService } from "./students.service";
import { StudentController } from "./stuents.controller";

@Module({
    imports: [SequelizeModule.forFeature([Student])],
    providers: [StudentService],
    controllers: [StudentController]
})

export class StudentsModule{}