import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './players.schema';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() body: { name: string }): Promise<Player> {
    return this.playersService.create(body.name);
  }

  @Get()
  async getAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Player | null> {
    return this.playersService.findOne(id);
  }
}
