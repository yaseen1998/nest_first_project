import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import * as speakeasy from 'speakeasy';
import { Enable2FaType } from './types';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artistsService: ArtistsService
    ) {}

    async login(loginDTO:LoginDTO): Promise<{accessToken: string} | {message: string,validate2FA:string}> {
        const user = await this.userService.findOne(loginDTO);
        const passwordMatch = await bcrypt.compare(loginDTO.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        delete user.password;
        const artist = await this.artistsService.findArtist(user.id);
        const payload = { email: user.email, userId: user.id };
        if (artist) {
            payload['artistId'] = artist.id;
        }
        if(user.enable2FA && user.twoFactorSecret){
            return {validate2FA:"http://localhost:3000/auth/verify-2fa",message:"2FA is enabled"};
        }
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }


    async enable2FA(userId: number): Promise<Enable2FaType> {
        const user = await this.userService.findById(userId);
        if (user.enable2FA )return { secret: user.twoFactorSecret };
        const secret = speakeasy.generateSecret();
        console.log(secret);
        // user.twoFactorSecret = secret.base32;
        // user.enable2FA = true;
        // await this.userService.save(user);
        await this.userService.updateSectetKey(userId, secret.base32);
        return { secret: secret.base32 };
    }

    async verify2FA(userId: number, token: string): Promise<{ verified: boolean }> {
        const user = await this.userService.findById(userId);
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
        });
        return { verified };
    }

    async disable2FA(userId: number){
        return await this.userService.disable2FA(userId);
        
    }

    async validateApiKey(apiKey: string):Promise<User> {
        return await this.userService.findByApiKey(apiKey);
    }

}
