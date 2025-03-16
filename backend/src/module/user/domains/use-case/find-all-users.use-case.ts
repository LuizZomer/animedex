import { Injectable } from '@nestjs/common';
import { UserGateway } from '../../gateway/user-gateway.prisma';

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute() {
    return this.userGateway.findUsers();
  }
}
