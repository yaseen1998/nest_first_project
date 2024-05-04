import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create_user_dto";

@Controller('users')
export class UsersController{
    constructor(private usersService:UsersService){}
    @Post()
    create(@Body() createUserDto:CreateUserDto):
    Promise<User>{
        return this.usersService.create(createUserDto);
    }
}