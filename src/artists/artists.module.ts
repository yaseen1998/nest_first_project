import { Module } from "@nestjs/common";
import { Artist } from "./artist.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistsService } from "./artists.service";

@Module({
    providers: [ArtistsService],
    controllers: [],
    imports: [
        TypeOrmModule.forFeature([Artist]),
    ],
    exports: [ArtistsService]
})

export class ArtistsModule {}