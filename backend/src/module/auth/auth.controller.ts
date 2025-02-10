import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth } from 'src/utils/guards/user-auth.guard';
import { JwtAuth } from 'src/utils/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuth)
  @Get('teste')
  teste() {
    return 'deu bom';
  }

  @UseGuards(UserAuth)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
