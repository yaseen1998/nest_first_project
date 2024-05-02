import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

// @Module({
//   controllers: [SongsController],
//   providers: [SongsService],
// })
const mockSongsService = {
  findAll: () => ['test'],
};
@Module({
  imports:[TypeOrmModule.forFeature([Song,Artist])],
    controllers:[SongsController],
  providers:[
    SongsService,
  //   {
  //   provide:SongsService, // provide is used to provide the service that means the service that we want to provide it usefull when we want to provide the service that is not the same as the service name
  //   useClass:SongsService, // useClass is used to provide the class that means the class that we want to provide it usefull when we want to provide the class that is not the same as the service name
  // },
  // {
    
  //     provide:SongsService, // provide is used to provide the service that means the service that we want to provide it usefull when we want to provide the service that is not the same as the service name
  //     useValue:mockSongsService, // useValue is used to provide the value that means the value that we want to provide it usefull when we want to provide the value that is not the same as the service name
    
  // }
  {
    provide:"CONNECTION",
    useValue:connection
  }

]
})
export class SongsModule {}
