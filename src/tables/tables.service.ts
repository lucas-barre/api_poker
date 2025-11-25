import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from './tables.schema';

@Injectable()
export class TablesService {
    constructor(@InjectModel(Table.name) private tableModel: Model<TableDocument>) {}

    async findAll(): Promise<Table[]> {
        return this.tableModel.find().exec();
    }

    async findByName(name: string): Promise<string> {
        const table = await this.tableModel.findOne({
            name: new RegExp(`^${name}$`, 'i'),
        }).exec();
        if (!table) {
            return `La table ${name} n'existe pas.`;
        }
        return `Bienvenue sur la table ${table.name}`;
    }
}
