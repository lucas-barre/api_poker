export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

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
