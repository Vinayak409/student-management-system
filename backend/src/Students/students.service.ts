import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student, StudentI } from './students.model';
import * as fs from 'fs/promises';
import { StudentsDto } from './studetns.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  createStudent(studentsDto : StudentsDto, filePath: string) {
    return this.studentModel.create({...studentsDto, photo: filePath});
  }

  getAllStudents() {
    return this.studentModel.findAll();
  }

  getOneStudent(id: number) {
    return this.studentModel.findOne({ where: { id } });
  }

  async udpateStudent(id: number, studentsDto : StudentsDto) {
    const [affectedRows, [updtedStudent]] = await this.studentModel.update(
      studentsDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updtedStudent;
  }

  async deleteStudent(id: number) {
    const removeStudent = await this.studentModel.findOne({ where: { id } });
    // console.log(removeStudent);
    this.studentModel.destroy({ where: { id } });
    return removeStudent;
  }

  async saveFile(filename: string, fileBuffer: Buffer) {
    const uploadDir = 'uploads';
    const filePath = `${uploadDir}/${filename}`;
    await fs.writeFile(filePath, fileBuffer);
    return filePath;
  }

  async updateStudentPhoto(id: number, filePath: string) {
    const userToUpdate = await this.studentModel.findOne({
      where: {
        id,
      },
    });

    const [affectedRows, [updtedStudent]] = await this.studentModel.update(
      { photo: filePath },
      {
        where: { id },
        returning: true,
      },
    );
    return updtedStudent;
  }
}
