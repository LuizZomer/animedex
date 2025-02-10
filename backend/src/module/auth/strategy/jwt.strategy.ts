import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'dsjfoksjfskldkdkasmdlkasdmlkasmdlkasmdas,cd[assaxçsa;xsça;x]',
    });
  }

  async validate(payload: {
    id: number;
    username: string;
  }): Promise<Pick<User, 'id' | 'username'>> {
    return { id: payload.id, username: payload.username };
  }
}
