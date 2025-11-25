import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ default: 1000 })
    balance: number;

    @Prop({ type: String, default: null })
    currentTable: string | null;
    id?: string;
}
export const PlayerSchema = SchemaFactory.createForClass(Player);
