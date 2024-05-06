import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constant';
import { JwtStrategy } from './jwt_strategy';

@Module({
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule,JwtModule.register({
    secret:authConstants.secret,
    signOptions:{expiresIn:'1d'}
  },
),],
  exports: [AuthService]
})
export class AuthModule {}
