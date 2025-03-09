import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ChatGatewayWebSocket } from './gateway/chat-gateway.websocket';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './presentation/controller/chat.controller';
import { ChatServices } from './domains/chat.service';
import { ChatGateway } from './gateway/chat-gateway.prisma';
import { CreateChatUseCase } from './domains/use-case/create-chat.use-case';
import { SendMessageUseCase } from './domains/use-case/send-message.use-case';
import { ListAllChatMessagesUseCase } from './domains/use-case/list-all-chat-messages.use-case';
import { FileModule } from '../file/file.module';
import { FindAllChatsWithRelationsUseCase } from './domains/use-case/find-all-chats.use-case';

@Module({
  imports: [JwtModule, FileModule],
  controllers: [ChatController],
  providers: [
    PrismaService,
    ChatGatewayWebSocket,
    ChatServices,
    ChatGateway,
    CreateChatUseCase,
    SendMessageUseCase,
    ListAllChatMessagesUseCase,
    FindAllChatsWithRelationsUseCase,
  ],
  exports: [ChatServices],
})
export class ChatModule {}
