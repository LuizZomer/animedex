import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { createChatDTO } from '../dto/create-chat.dto';
import { ChatServices } from '../../domains/chat.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatServices) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllChats() {
    const allChats = await this.chatService.listAllChats();

    return {
      statusCode: HttpStatus.OK,
      content: allChats,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('messages/:chatId')
  async findAllChatMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    console.log(chatId);

    const allMessages = await this.chatService.listAllChatMessages(chatId);

    return {
      statusCode: HttpStatus.OK,
      content: allMessages,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createChat(
    @Body() body: createChatDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(body.tags);

    const newChat = await this.chatService.createChat({
      category: body.category,
      name: body.name,
      description: body.description,
      photo: file,
      tags: JSON.parse(body.tags as unknown as string),
    });

    return {
      statusCode: HttpStatus.CREATED,
      content: {
        newChat,
      },
    };
  }
}
