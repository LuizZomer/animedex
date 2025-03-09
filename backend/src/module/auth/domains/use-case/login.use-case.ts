import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class LoginUseCase {
  constructor(private jwtService: JwtService) {}

  async execute(user: User) {
    const payload = {
      username: user.username,
      id: user.id,
      photo: user.perfilPhoto,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
