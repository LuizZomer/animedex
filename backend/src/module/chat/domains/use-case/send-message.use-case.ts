import { Injectable } from '@nestjs/common';
import { ICreateChatLine } from 'src/@types/chatLine/createChatLine.interface';
import { ChatGateway } from '../../gateway/chat-gateway.prisma';

@Injectable()
export class SendMessageUseCase {
  constructor(private readonly chatGateway: ChatGateway) {}

  async execute(chatData: ICreateChatLine) {
    return this.chatGateway.createChatLine(chatData);
  }
}
