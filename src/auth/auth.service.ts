import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PlayersService } from '../players/players.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly playersService: PlayersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: { username: string; password: string}) {
        const hash = await bcrypt.hash(dto.password, 10);

        const player = await this.playersService.create({
            username: dto.username,
            passwordHash: hash,
            balance: 1000,
        });

        const token = this.jwtService.sign({ sub: player.id, email: player.username });
        return { token, player };
    }

    async login(dto: { username: string; password: string }) {
        const player = await this.playersService.findByUsername(dto.username);
        if (!player || !(await bcrypt.compare(dto.password, player.passwordHash))) {
        throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ sub: player.id, username: player.username });
        return { token, player };
    }
    async getProfile(userId: string) {
        return this.playersService.findOne(userId);
    }

}

