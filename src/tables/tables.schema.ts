import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Table & Document;

@Schema({ collection: 'tables_collection' })
export class Table {
    @Prop({ required: true, unique: true }) name: string;
    @Prop({ required: true }) small_blind: number;
    @Prop({ required: true }) big_blind: number;
    @Prop({ type: [String], default: [] }) players: string[];
    @Prop({ default: 9 }) maxSeats: number;
}


export const TableSchema = SchemaFactory.createForClass(Table);
