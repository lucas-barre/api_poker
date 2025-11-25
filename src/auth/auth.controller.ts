import { Controller, Get, Req, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        return this.authService.login(body);
    }
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req) {
        return this.authService.getProfile(req.user.sub);
    }
}
