import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { createChatDTO } from './dto/create-chat.dto';
import { ChatServices } from './chat.service';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatServices) {}

  @Get()
  async findAll() {
    return this.chatService.listAllChats();
  }

  @Post()
  async createChat(@Body() body: createChatDTO, @Res() res: Response) {
    const newChat = await this.chatService.createChat({
      category: body.categories,
      name: body.name,
    });

    res.status(201).send({
      statusCode: HttpStatus.CREATED,
      content: {
        newChat,
      },
    });
  }
}
