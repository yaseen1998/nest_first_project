import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create_user_dto';
import { UsersService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {}
    @Post("signup")
    async signup(@Body() createUserDto:CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
    @Post("login")
    async login(@Body() loginDTO:LoginDTO) {
        return await this.authService.login(loginDTO);
    }
}
