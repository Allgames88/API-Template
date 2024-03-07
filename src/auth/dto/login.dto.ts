import { Transform } from 'class-transformer';
import {IsEmail, IsOptional, IsString, Min, MinLength} from 'class-validator'

export class LoginDTO {
    
    @IsString({message:"Name has to be a string"})
    @MinLength(1)
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString({message:"Password has to be a string"})
    @MinLength(8)
    @Transform(({value}) => value.trim())
    password: string;
}