import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlist')
export class PlayList {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;

@OneToMany(()=>Song,(song)=>song.playList)
songs:Song[];
// @JoinColumn() // this is the owning side

@ManyToOne(()=>User,(user)=>user.playLists)
user:User;
// add created at and updated at
@CreateDateColumn()
createdAt:Date;

}