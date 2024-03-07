import { IsString, MinLength} from 'class-validator'

export class TwitchLoginDTO {
    
    @IsString({message:"Name has to be a string"})
    @MinLength(1)
    name: string;

    @IsString({message:"Secret has to be a secret string"})
    @MinLength(1)
    secret: string;
}