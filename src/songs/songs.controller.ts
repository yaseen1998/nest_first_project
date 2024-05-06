import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create_song_dto';
import { Connection } from 'src/common/constants/connection';
import { UpdateSongDto } from './dto/update-song-dto';
import { JwtAuthGuard } from 'src/auth/jwt_guard';

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
    // @UseGuards(JwtAuthGuard)
    findALl(){
        return this.songsSerivce.findAll()
    }
    @Get("paginate")
    paginate(
        @Query('page', new DefaultValuePipe(1),ParseIntPipe) page=1,
        @Query('limit', new DefaultValuePipe(10),ParseIntPipe) limit=10,
    ){
        console.log(page,limit)
        limit = limit > 100 ? 100 : limit;
        return this.songsSerivce.paginate({
            page,
            limit,
        })
    }
    @Get(":id")
    findOne(@Param('id',
        new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})
    ) id: number){
        // fetch the id from the url
        // const idNumber = Number(id)
        // if (isNaN(idNumber)) throw new HttpException('id is string',HttpStatus.FORBIDDEN,{cause:"e"})
        return this.songsSerivce.findOne(id)
    }

    @Put(":id")
    update(@Param('id') id:number, @Body() updateSongDTO: UpdateSongDto){
        return this.songsSerivce.update(id,updateSongDTO)
    }

    @Delete(":id")
    delete_item(@Param('id') id:number){
        return this.songsSerivce.remove(id)
    }

    @Post()
    create_item(@Body() createSongDTO: CreateSongDto){
        return this.songsSerivce.create(createSongDTO)
    }
    
}

