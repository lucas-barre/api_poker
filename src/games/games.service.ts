import { Injectable } from '@nestjs/common';
import { createDeck, shuffle, dealToPlayers, GAME_RULES } from './games.schema';

@Injectable()
export class GamesService {
    startGame(playerCount: number) {
        let deck = createDeck();
        deck = shuffle(deck);

        const { hands, remainingDeck } = dealToPlayers(deck, playerCount);

        return {
            hands,
            remainingDeck,
            rules: GAME_RULES,
        };
    }
    showDeck() {
        let deck = createDeck();
        const deckShuffled = shuffle(deck);
        return deckShuffled;
    };
}
