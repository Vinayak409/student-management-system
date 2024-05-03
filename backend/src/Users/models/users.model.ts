import { Column, Model, Table } from 'sequelize-typescript';
export interface UserI {
  id?: number;
  email: string;
  password: string;
}

type UserCreationAttributes = Omit<UserI, 'id'>;

@Table
export class User extends Model<UserI, UserCreationAttributes> implements UserI {
  @Column
  email: string;

  @Column
  password: string;
}
