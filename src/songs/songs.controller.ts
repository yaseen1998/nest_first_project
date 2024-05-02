import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create_song_dto';
import { Connection } from 'src/common/constants/connection';

@Controller({
    path:"songs",
    scope:Scope.REQUEST
})
export class SongsController {
    constructor(private songsSerivce:SongsService,
        @Inject("CONNECTION") private connection: Connection

    ){
        console.log(this.connection)
    }
    @Get()
    findALl(){
        return this.songsSerivce.findAll()
    }

    @Get(":id")
    findOne(@Param('id',
        new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
    ) id: number):string{
        // fetch the id from the url
        // const idNumber = Number(id)
        // if (isNaN(idNumber)) throw new HttpException('id is string',HttpStatus.FORBIDDEN,{cause:"e"})
        return `get one song ${id}`
    }

    @Put(":id")
    update(){
        return 'update'
    }

    @Delete(":id")
    delete_item(){
        return "delete item"
    }

    @Post()
    create_item(@Body() createSongDTO: CreateSongDto){
        return this.songsSerivce.create(createSongDTO)
    }
}

