import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { Player, PlayerSchema } from './players/players.schema';
import { TablesController } from './tables/tables.controller';
import { TablesService } from './tables/tables.service';
import { Table, TableSchema } from './tables/tables.schema';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://marcel:123_soleil@localhost:27017/poker_db', {
            authSource: 'poker_db',
        }),
        MongooseModule.forFeature([
            { name: Player.name, schema: PlayerSchema },
            { name: Table.name, schema: TableSchema },
        ]),
    ],
    controllers: [AppController, PlayersController, TablesController, GamesController],
    providers: [AppService, PlayersService, TablesService, GamesService],
})
export class AppModule {}
