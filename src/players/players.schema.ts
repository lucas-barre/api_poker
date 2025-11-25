import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 1000 })
  balance: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
