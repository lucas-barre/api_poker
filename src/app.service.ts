import { Injectable } from '@nestjs/common';
import { Table } from './tables/tables.schema';
import { TablesService } from './tables/tables.service';

@Injectable()
export class AppService {
    constructor(private readonly tablesService: TablesService) {}

    async getHello(): Promise<string> {
        const tables: Table[] = await this.tablesService.findAll();

        const tableNames = tables.map(t => t.name).join(', ');

        return `Coucou tout le monde — tables disponibles: ${tableNames}`;
    }
}
