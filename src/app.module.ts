import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './user/user.entity';
import { PlayList } from './playlists/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayListModule } from './playlists/playlist.module';
import { UserModule } from './user/user.module';
const devConfig = {port:3000};
const proConfig = {port:4000};

// @Module({
//   imports: [SongsModule],
//   controllers: [AppController],
//   providers: [AppService,{
//     provide:DevConfigService,
//     useClass:DevConfigService
//   },
//   

//   ],
// })
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'nest',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '202020',
      entities: [Song, Artist, User, PlayList],
      synchronize: true,
    }),
    SongsModule,
    PlayListModule, // benfit to add this module is to make the code more readable and maintainable
    UserModule ,
  ],
  controllers: [AppController],
  providers: [AppService,{
        provide:DevConfigService,
        useClass:DevConfigService
      },
      {
            provide:"CONFIG",
            useFactory:()=>{
              if(process.env.NODE_ENV === "development"){
                return devConfig
              }else{
                return proConfig
              }
            }
          }
    
    ],

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs') // option 1
    // consumer.apply(LoggerMiddleware).forRoutes({ path:"songs",method:RequestMethod.POST }) // option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController) // option 3 
  }
}
