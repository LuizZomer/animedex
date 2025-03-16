import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../../gateway/chat-gateway.prisma';
import { DefaultFilter } from 'src/@types/pagination/defaultFilter';
import { Paginator } from 'src/utils/paginator';

@Injectable()
export class FindAllChatsWithRelationsUseCase {
  constructor(private readonly chatGateway: ChatGateway) {}

  async execute({ take, page }: DefaultFilter) {
    const [chats, totalItems] = await this.chatGateway.findAllChatsWithRelation(
      {
        take,
        page,
      },
    );

    const pagination = new Paginator({
      totalItems,
      pageSize: take,
    });

    pagination.goToPage(page);

    return { items: chats, pagination: pagination.getPagination() };
  }
}
