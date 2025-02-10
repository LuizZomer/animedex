import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ChatGateway } from './gateway/chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';
import { ChatServices } from './chat.service';

@Module({
  imports: [JwtModule],
  controllers: [ChatController],
  providers: [PrismaService, ChatGateway, ChatServices],
  exports: [ChatServices],
})
export class ChatModule {}
