import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './students.model';
import * as fs from 'fs/promises';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  createStudent(student: Student) {
    return this.studentModel.create({ ...student });
  }

  getAllStudents() {
    return this.studentModel.findAll();
  }

  getOneStudent(id: number) {
    return this.studentModel.findOne({ where: { id } });
  }

  async udpateStudent(id: number, student: Student) {
    const [affectedRows, [updtedStudent]] = await this.studentModel.update(
      student,
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
    return updtedStudent
  }
}
