import { Injectable } from '@nestjs/common';
import { Chat, ChatLine } from '@prisma/client';
import { ICreateChatLine } from 'src/@types/chatLine/createChatLine.interface';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ListAllMessagesOutput } from '../presentation/dto/listAllMessages.output';
import { ChatGatewayInterface } from './chat-gateway.interface';
import { IChatTagsDTO } from '../presentation/dto/chatTags.dto';

@Injectable()
export class ChatGateway implements ChatGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createChat({
    category,
    description,
    name,
    photo,
    tags,
  }: Pick<Chat, 'category' | 'description' | 'name' | 'photo'> & {
    tags: IChatTagsDTO[];
  }) {
    const newChatWithTags = await this.prisma.$transaction(
      async (transactionPrisma) => {
        const newChat = await transactionPrisma.chat.create({
          data: {
            name,
            category,
            description,
            photo,
          },
        });

        const tagsOfChat = tags.map(({ id }) => ({
          chatId: newChat.id,
          chatTagId: id,
        }));

        await transactionPrisma.tagsOfChats.createMany({
          data: tagsOfChat,
        });

        return newChat;
      },
    );

    return newChatWithTags;
  }

  async createChatLine({
    chatId,
    message,
    userId,
  }: ICreateChatLine): Promise<ChatLine> {
    return this.prisma.chatLine.create({
      data: {
        chatId,
        message,
        userId,
      },
    });
  }

  async listAllChatMessagesByChatId(
    chatId: number,
  ): Promise<ListAllMessagesOutput[]> {
    return this.prisma.chatLine.findMany({
      select: {
        User: {
          select: {
            username: true,
            id: true,
          },
        },
        id: true,
        createdAt: true,
        message: true,
      },
      where: {
        chatId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findAllChatsWithRelation() {
    return this.prisma.chat.findMany({
      include: {
        TagsOfChats: {
          select: {
            tag: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }
}
