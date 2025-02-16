import { Injectable } from '@nestjs/common';
import { Chat, ChatLine } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ChatServices {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage({
    chatId,
    message,
    userId,
  }: Pick<ChatLine, 'chatId' | 'message' | 'userId'>) {
    return this.prisma.chatLine.create({
      data: {
        chatId,
        message,
        userId,
      },
    });
  }

  async createChat({
    category,
    name,
    description,
  }: Omit<Chat, 'id' | 'createdAt'>) {
    return this.prisma.chat.create({
      data: {
        name,
        category,
        description,
      },
    });
  }

  async listAllChats() {
    return this.prisma.chat.findMany();
  }

  async listAllChatMessages(chatId: number) {
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
}
