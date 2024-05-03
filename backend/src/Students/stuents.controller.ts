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
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentService } from './students.service';
import { StudentsDto } from './studetns.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // ++++++++++++++++++++++++++++++++++++
  // previous code
  // @Post()
  // create(@Body() studentsDto: StudentsDto) {
  //   if (!studentsDto) {
  //     throw new Error("student doesn't exist");
  //   }
  //   const newStudent = this.studentService.createStudent(studentsDto);
  //   return newStudent;
  // }

  // @Post('upload/:id')
  // @UseInterceptors(FileInterceptor('photo'))
  // @Bind(UploadedFile())
  // async uploadFile(
  //   file: Express.Multer.File,
  //   @Param('id', ParseIntPipe)
  //   id: number,
  // ) {
  //   if (!file) {
  //     throw new Error("file doesn't exist");
  //   }
  //   const fileBuffer = file.buffer;
  //   const filePath = await this.studentService.saveFile(
  //     file.originalname,
  //     fileBuffer,
  //   );
  //   return this.studentService.updateStudentPhoto(id, filePath);
  //   // return { filePath };
  // }
  // ++++++++++++++++++++++++++++++++++++

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  // @Bind(UploadedFile())
  async create(
    @Body() studentsDto: StudentsDto,
    @UploadedFile() file,
    // file: Express.Multer.File,
    // @Req() req,
  ) {
    console.log(studentsDto);
    // console.log(file.originalname);

    const fileBuffer = file.buffer;
    const filePath = await this.studentService.saveFile(
      file.originalname,
      fileBuffer,
    );
    return this.studentService.createStudent(studentsDto, filePath)
    // return this.studentService.updateStudentPhoto(id, filePath);


    // console.log(file.buffer);
    // console.log('req', req.file);
    // return;
    // return {...studentsDto, file}
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() studentsDto: StudentsDto,
  ) {
    return this.studentService.udpateStudent(id, studentsDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
