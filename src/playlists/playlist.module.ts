import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayList } from "./playlist.entity";
import { User } from "src/user/user.entity";
import { Song } from "src/songs/song.entity";
import { PlayListsService } from "./playlist.service";
import { PlayListsController } from "./playlist.controller";

@Module({
    imports:[TypeOrmModule.forFeature([PlayList,Song,User])],
    controllers:[PlayListsController],
    providers:[PlayListsService]
})

export class PlayListModule {}