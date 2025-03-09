import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../../gateway/chat-gateway.prisma';
import { ListAllMessagesOutput } from '../../presentation/dto/listAllMessages.output';

@Injectable()
export class ListAllChatMessagesUseCase {
  constructor(private readonly chatGateway: ChatGateway) {}

  async execute(chatId: number): Promise<ListAllMessagesOutput[]> {
    return this.chatGateway.listAllChatMessagesByChatId(chatId);
  }
}
