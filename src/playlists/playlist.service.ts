import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayList } from "./playlist.entity";
import { Repository } from "typeorm";
import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { CreatePlayListDto } from "./dto/create_playlist_dto";

@Injectable()
export class PlayListsService{
    constructor(
        @InjectRepository(PlayList)
        private playListRepo : Repository<PlayList>,

        @InjectRepository(Song)
        private songsRepo : Repository<Song>,

        @InjectRepository(User)
        private userRepo : Repository<User>,

    ){}
    async create(playListDTO:CreatePlayListDto):Promise<PlayList>{
        const playList = new PlayList();
        playList.name = playListDTO.name;
        const songs = await this.songsRepo.findBy(playListDTO.songs);
        playList.songs = songs;
        const user = await this.userRepo.findOneBy({id:playListDTO.user});
        playList.user = user;
        return this.playListRepo.save(playList);
    }
}