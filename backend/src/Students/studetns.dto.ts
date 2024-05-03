import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudentsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  @IsString()
  branch: string;

  @IsNumber()
  @Transform((semester) => +semester.value)
  @IsNotEmpty()
  semester: number;
}
