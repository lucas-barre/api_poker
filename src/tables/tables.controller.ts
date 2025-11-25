import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TablesService } from './tables.service';
import { Table } from './tables.schema';

@Controller('tables')
export class TablesController {
    constructor(private readonly tablesService: TablesService) {}

    // Liste toutes les tables
    @Get()
    async getAll(): Promise<Table[]> {
        return this.tablesService.findAll();
    }

    // Récupère une table par son id
    @Get(':name')
    async getByName(@Param('name') name: string): Promise<string> {
        return this.tablesService.findByName(name);
    }

}
