import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './players.schema';

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async create(@Body() body: { username: string; passwordHash: string }): Promise<Player> {
        return this.playersService.create({
        username: body.username,
        passwordHash: body.passwordHash,
        balance: 1000,
        });
    }

    @Get()
    async getAll() {
        return this.playersService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Player | null> {
        return this.playersService.findOne(id);
    }
}
