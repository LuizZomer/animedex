import { Injectable } from '@nestjs/common';
import { ICreateChatLine } from 'src/@types/chatLine/createChatLine.interface';
import { createChatDTO } from '../presentation/dto/create-chat.dto';
import { CreateChatUseCase } from './use-case/create-chat.use-case';
import { SendMessageUseCase } from './use-case/send-message.use-case';
import { ListAllChatMessagesUseCase } from './use-case/list-all-chat-messages.use-case';
import { FindAllChatsWithRelationsUseCase } from './use-case/find-all-chats.use-case';
import { User } from '@prisma/client';
import { DefaultFilter } from 'src/@types/pagination/defaultFilter';

@Injectable()
export class ChatServices {
  constructor(
    private readonly createChatUseCase: CreateChatUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly listAllChatMessagesUseCase: ListAllChatMessagesUseCase,
    private readonly findAllChatsWithRelationsUseCase: FindAllChatsWithRelationsUseCase,
  ) {}

  async sendMessage(chatLineData: ICreateChatLine) {
    return this.sendMessageUseCase.execute(chatLineData);
  }

  async createChat(chatData: createChatDTO, user: User) {
    return this.createChatUseCase.execute(chatData, user);
  }

  async listAllChats({ take, page }: DefaultFilter) {
    return this.findAllChatsWithRelationsUseCase.execute({ take, page });
  }

  async listAllChatMessages(chatId: number) {
    return this.listAllChatMessagesUseCase.execute(chatId);
  }
}
