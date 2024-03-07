import { Transform } from 'class-transformer';
import {IsEmail, IsString, Min, MinLength} from 'class-validator'

export class RegisterDTO {
    
    @IsString({message:"Name has to be a string"})
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @IsString({message:"Password has to be a string"})
    @MinLength(8)
    @Transform(({value}) => value.trim())
    password: string;
}