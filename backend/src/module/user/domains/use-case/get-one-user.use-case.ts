import { User } from '@prisma/client';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetOneUserUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(username: string): Promise<User | null> {
    return this.userGateway.findOneUserByUsername(username);
  }
}
