import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  login(user: User) {
    const payload = { username: user.username, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
