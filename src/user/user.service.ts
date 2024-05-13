import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { User } from "src/user/user.entity";
import { CreateUserDto } from "./dto/create_user_dto";
import * as bcrypt from 'bcrypt';
import { LoginDTO } from "src/auth/dto/login.dto";
import {v4 as uuid4} from 'uuid';
@Injectable()
export class UsersService{
    constructor(


        @InjectRepository(User)
        private userRepo : Repository<User>,

    ){}
    async create(userDTO:CreateUserDto):Promise<User>{
        const salt = await bcrypt.genSalt(); // 2.
    userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
    userDTO.apiKey = uuid4(); // 4.
    const user = await this.userRepo.save(userDTO); // 4.
    delete user.password; // 5.
    return user; // 6.
    }

    async findOne(loginDTO:LoginDTO):Promise<User>{
        const user =  await this.userRepo.findOneBy({email:loginDTO.email});
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    async findById(id:number):Promise<User>{
        return this.userRepo.findOneBy({id:id});
    }


    async save(user:User):Promise<User>{
        return this.userRepo.save(user);
    }

    async updateSectetKey(userId:number,secret:string):Promise<UpdateResult>{
        return this.userRepo.update(userId,{twoFactorSecret:secret,enable2FA:true});
    }

    async disable2FA(userId:number):Promise<UpdateResult>{
        return this.userRepo.update(userId,{twoFactorSecret:null,enable2FA:false});
    }

    async findByApiKey(apiKey:string):Promise<User>{
        return this.userRepo.findOneBy({apiKey});
    }
}