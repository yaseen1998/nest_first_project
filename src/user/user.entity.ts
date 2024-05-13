import { Exclude } from "class-transformer";
import { PlayList } from "src/playlists/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    firstName:string
    @Column()
    lastName:string;
    @Column(
        {unique:true}
    )
    email:string;
    
    @Column()
    @Exclude()
    password:string;

    @OneToMany(()=>PlayList,(playlist)=>playlist.user)
    playLists:PlayList[]

    @Column({nullable:true,type:'text'})
    twoFactorSecret:string;

    @Column({default:false,type:'boolean'})
    enable2FA:boolean;

    @Column({nullable:true,type:'text'})
    apiKey:string;

    @Column({nullable:true,type:'text'})
    phone:string;
}