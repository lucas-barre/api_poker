import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    root() {
        return {
        message: 'Bienvenue sur Poker API',
        actions: {
            register: { route: '/auth/register', payload: '{ username, password }' },
            login: { route: '/auth/login', payload: '{ username, password }' },
            startGame: { route: '/games/start/:tableName' }
        }
        };
    }
}
