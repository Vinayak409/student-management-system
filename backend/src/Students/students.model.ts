import { Column, Model, Table } from 'sequelize-typescript';

export interface StudentI {
  id?: number;
  name: string;
  email: string;
  dob: string;
  branch: string;
  semester: number;
  photo: string;
}

type StudentCreationAttributes = Omit<StudentI, 'id'>;

@Table
export class Student extends Model<StudentI, StudentCreationAttributes> implements StudentI {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  dob: string;

  @Column
  branch: string;

  @Column
  semester: number;

  @Column
  photo: string;
}
