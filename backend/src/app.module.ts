import { Module } from '@nestjs/common';
import { PrismaService } from './config/prisma/prisma.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { ChatModule } from './module/chat/chat.module';

@Module({
  imports: [UserModule, AuthModule, ChatModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
