import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDto } from './dto/create_song_dto';
import { Song } from './song.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { UpdateSongDto } from './dto/update-song-dto';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable(
    {scope:Scope.TRANSIENT} // every time when requeste remove all data
)


export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepo : Repository<Song>,
        @InjectRepository(Artist)
        private artistRepo : Repository<Artist>
    ){}

    private readonly songs =[];
    async create(songDTO:CreateSongDto):Promise<Song>{
        const song = new Song();
        song.title = songDTO.title;
        song.lyrics = songDTO.lyrics;
        // song.artists = songDTO.artists;
        song.relaeaseDate = songDTO.releaseDate;
        song.duration = songDTO.duration;
        const artists = await this.artistRepo.findBy({ id: In(songDTO.artists) });
        song.artists = artists;
        return this.songRepo.save(song);
    }
    findAll():Promise<Song[]>{
        return this.songRepo.find();
    }
    findOne(id:number):Promise<Song>{
        return this.songRepo.findOneBy({id});
    }
    async remove(id:number):Promise<void>{
        await this.songRepo.delete(id);
    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songRepo.update(id, recordToUpdate);
      }

      async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepo.createQueryBuilder('c');
        queryBuilder.orderBy('c.relaeaseDate', 'DESC');
    
        return paginate<Song>(queryBuilder, options);
      }
    }
