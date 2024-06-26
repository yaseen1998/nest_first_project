import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator"

export class CreateSongDto{
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    @IsArray()
    readonly artist: string[];
    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;
    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;
}