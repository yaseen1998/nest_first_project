import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSongDto{
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly lyrics: string;
    @IsOptional()
    @IsArray()
    @IsNumber({},{each:true})
    readonly artists;
    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;
    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;
}