import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './players.schema';

@Injectable()
export class PlayersService {
    constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

    async create(data: { username: string; passwordHash: string; balance: number }): Promise<Player> {
        const created = new this.playerModel(data);
        return created.save();
    }

    async findAll(): Promise<{ username: string; balance: number }[]> {
        return this.playerModel.find().select('username balance -_id').lean().exec();
    }


    async findOne(id: string): Promise<Player | null> {
        return this.playerModel.findById(id).exec();
    }

    async findByUsername(username: string): Promise<Player | null> {
        return this.playerModel.findOne({ username }).exec();
    }
}
