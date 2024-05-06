import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(loginDTO:LoginDTO): Promise<{accessToken: string}> {
        const user = await this.userService.findOne(loginDTO);
        const passwordMatch = await bcrypt.compare(loginDTO.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        delete user.password;
        const payload = { email: user.email, userId: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
