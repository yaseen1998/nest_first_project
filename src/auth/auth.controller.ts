import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create_user_dto';
import { UsersService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO, ValidateTokenDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt_guard';
import { Enable2FaType } from './types';

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
    @Get("enable-2fa")
    @UseGuards(JwtAuthGuard)
    enable2FA(@Request() req):Promise<Enable2FaType>{
        return this.authService.enable2FA(req.user.userId);
    }
    @Post("verify-2fa")
    @UseGuards(JwtAuthGuard)
    verify2FA(@Request() req,@Body() ValidateTokenDto:ValidateTokenDTO){
        return this.authService.verify2FA(req.user.userId,ValidateTokenDto.token);
    }

    @Get("disable-2fa")
    @UseGuards(JwtAuthGuard)
    disable2FA(@Request() req){
        return this.authService.disable2FA(req.user.userId);
    }
}
