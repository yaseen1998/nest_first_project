import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}


export class ValidateTokenDTO{
    @IsNotEmpty()
    @IsString()
    token:string;
}