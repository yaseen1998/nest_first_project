import {
    IsArray,
    IsDateString,
    IsMilitaryTime,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UpdateSongDto {
    @IsString()
    @IsOptional()
    readonly title;
  
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly artists;
  
    @IsDateString()
    @IsOptional()
    readonly relaeaseDate: Date;
  
    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date;
  
    @IsString()
    @IsOptional()
    readonly lyrics: string;
  }