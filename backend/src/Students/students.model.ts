import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Student extends Model {
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
