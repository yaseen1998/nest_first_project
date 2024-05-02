import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlist')
export class PlayList {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;

@OneToMany(()=>Song,(song)=>song.playList)
songs:Song[];


@ManyToOne(()=>User,(user)=>user.playLists)
user:User;

}