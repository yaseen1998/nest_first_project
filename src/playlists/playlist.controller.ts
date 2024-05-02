import { Body, Controller, Post } from "@nestjs/common";
import { PlayListsService } from "./playlist.service";
import { CreatePlayListDto } from "./dto/create_playlist_dto";
import { PlayList } from "./playlist.entity";

@Controller('playlists')
export class PlayListsController{
    constructor(private playListService:PlayListsService){}
    @Post()
    create(@Body() createPlayListDto:CreatePlayListDto):
    Promise<PlayList>{
        return this.playListService.create(createPlayListDto);
    }
}