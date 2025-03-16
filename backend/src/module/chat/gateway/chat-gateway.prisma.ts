import { Injectable } from '@nestjs/common';
import { Chat, ChatLine, User } from '@prisma/client';
import { ICreateChatLine } from 'src/@types/chatLine/createChatLine.interface';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ListAllMessagesOutput } from '../presentation/dto/listAllMessages.output';
import { ChatGatewayInterface } from './chat-gateway.interface';
import { IChatTagsDTO } from '../presentation/dto/chatTags.dto';
import { AllChatsOutput } from 'src/@types/chats/allChatsOutput';
import { skipCalculation } from 'src/utils/skipCalculation';

@Injectable()
export class ChatGateway implements ChatGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createChat({
    category,
    description,
    name,
    photo,
    tags,
    isPublic,
    userAccess,
    creator,
  }: Pick<Chat, 'category' | 'description' | 'name' | 'photo' | 'isPublic'> & {
    tags: IChatTagsDTO[];
    userAccess: string[];
    creator: User;
  }) {
    const newChat = await this.prisma.chat.create({
      data: {
        name,
        category,
        description,
        photo,
        isPublic,
        userId: creator.id,
        tagsOfChats: {
          create: tags.map(({ id }) => ({
            tag: { connect: { id } },
          })),
        },
      },
      include: {
        tagsOfChats: {
          select: {
            tag: true,
          },
        },
      },
    });

    if (!isPublic && userAccess.length > 0) {
      const listId = await this.prisma.user.findMany({
        where: {
          externalId: { in: userAccess },
          id: { notIn: [creator.id] },
        },
        select: { id: true },
      });

      await this.prisma.accessUserChat.createMany({
        data: listId.map(({ id }) => ({
          chatId: newChat.id,
          userId: id,
        })),
      });
    }

    return newChat;
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
        user: {
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

  async findAllChatsWithRelation({
    take,
    page,
  }: {
    page: number;
    take: number;
  }): Promise<AllChatsOutput> {
    const totalItems = await this.prisma.chat.count();

    const paginationChats = await this.prisma.chat.findMany({
      include: {
        tagsOfChats: {
          select: {
            tag: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        accessUsersChat: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        creator: {
          select: {
            username: true,
          },
        },
      },
      skip: skipCalculation(page, take),
      take,
      orderBy: { id: 'desc' },
    });

    return [paginationChats, totalItems];
  }
}
