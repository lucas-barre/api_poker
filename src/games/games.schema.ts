import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type Suit = '♠'|'♥'|'♦'|'♣';
export type Rank = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K'|'A';
export interface Card { suit: Suit; rank: Rank; }

@Schema({ collection: 'games' })
export class Game {
    @Prop({ required: true }) tableName: string;
    @Prop({ type: [String], required: true }) players: string[];
    @Prop({ type: Object, required: true }) hands: Record<string, Card[]>;
    @Prop({ type: [Object], default: [] }) community: Card[];
    @Prop({ required: true }) pot: number;
    @Prop({ type: Object, required: true }) blinds: { small: number; big: number; smallPos: number; bigPos: number };
    @Prop({ type: Object, required: true }) bets: Record<string, number>;
    @Prop({ default: 'preflop' }) phase: 'preflop'|'flop'|'turn'|'river'|'showdown';
    @Prop({ required: true }) deck: Card[];
    @Prop({ required: true }) currentPlayerIndex: number;
    @Prop({ default: false }) isActive: boolean;
}


export interface Card {
    suit: Suit;
    rank: Rank;
}

// Create a standard 52-card deck
export function createDeck(): Card[] {
    const suits: Suit[] = ['♠', '♥', '♦', '♣'];
    const ranks: Rank[] = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    return suits.flatMap(suit => ranks.map(rank => ({ suit, rank })));
}

export function shuffle(deck: Card[]): Card[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function dealToPlayers(deck: Card[], playerCount: number): { hands: Card[][], remainingDeck: Card[] } {
    const hands: Card[][] = [];
    let index = 0;

    for (let p = 0; p < playerCount; p++) {
        hands.push([deck[index++], deck[index++]]);
    }

    return { hands, remainingDeck: deck.slice(index) };
}

export const GAME_RULES = {
    holeCards: 2,
    flopCards: 3,
    turnCards: 1,
    riverCards: 1,
};
