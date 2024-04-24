import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Student } from './students.model';
import { StudentService } from './students.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() student: Student) {
    if (!student) {
      throw new Error("student doesn't exist");
    }
    const newStudent = this.studentService.createStudent(student);
    return newStudent;
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('photo'))
  @Bind(UploadedFile())
  async uploadFile(
    file: Express.Multer.File,
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    if (!file) {
      throw new Error("file doesn't exist");
    }
    const fileBuffer = file.buffer;
    const filePath = await this.studentService.saveFile(
      file.originalname,
      fileBuffer,
    );
    return this.studentService.updateStudentPhoto(id, filePath);
    // return { filePath };
  }

  @Get()
  getAll() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getOneStudent(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() student: Student) {
    return this.studentService.udpateStudent(id, student);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
