import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString()
    password : string;
}