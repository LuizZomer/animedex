import { User } from '@prisma/client';
import { UserGatewayInterface } from './user-gateway.interface';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGateway implements UserGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    userData: Pick<User, 'email' | 'password' | 'perfilPhoto' | 'username'>,
  ): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async findOneUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
