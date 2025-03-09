import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../../gateway/chat-gateway.prisma';

@Injectable()
export class FindAllChatsWithRelationsUseCase {
  constructor(private readonly chatGateway: ChatGateway) {}

  async execute() {
    return this.chatGateway.findAllChatsWithRelation();
  }
}
