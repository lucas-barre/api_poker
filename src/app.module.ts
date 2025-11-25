import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
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
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import 'dotenv/config';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://marcel:123_soleil@localhost:27017/poker_db', {
            authSource: 'poker_db',
        }),
        MongooseModule.forFeature([
            { name: Player.name, schema: PlayerSchema },
            { name: Table.name, schema: TableSchema },
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'supersecret',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [
        AppController,
        PlayersController,
        TablesController,
        GamesController,
        AuthController,
    ],
    providers: [
        AppService,
        PlayersService,
        TablesService,
        GamesService,
        AuthService,
        JwtStrategy
    ],
})
export class AppModule {}
