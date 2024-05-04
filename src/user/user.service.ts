import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { CreateUserDto } from "./dto/create_user_dto";

@Injectable()
export class UsersService{
    constructor(


        @InjectRepository(User)
        private userRepo : Repository<User>,

    ){}
    async create(userDTO:CreateUserDto):Promise<User>{
        const user = new User();
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.email = userDTO.email;
        user.password = userDTO.password;
        return this.userRepo.save(user);
    }
}