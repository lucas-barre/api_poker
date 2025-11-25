import { Controller, Param, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get('start/:players')
    start(@Param('players') players: string) {
        return this.gamesService.startGame(Number(players));
    }

    @Get()
    showDeck() {
        return this.gamesService.showDeck();
    }
}
