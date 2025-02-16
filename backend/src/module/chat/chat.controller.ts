import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { createChatDTO } from './dto/create-chat.dto';
import { ChatServices } from './chat.service';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatServices) {}

  @Get()
  async findAllChats(@Res() res: Response) {
    const allChats = await this.chatService.listAllChats();

    res.status(200).send({
      statusCode: HttpStatus.OK,
      content: allChats,
    });
  }

  @Get('messages/:chatId')
  async findAllChatMessages(
    @Res() res: Response,
    @Param('chatId', ParseIntPipe) chatId: number,
  ) {
    console.log(chatId);

    const allMessages = await this.chatService.listAllChatMessages(chatId);

    res.status(200).send({
      statusCode: HttpStatus.OK,
      content: allMessages,
    });
  }

  @Post()
  async createChat(@Body() body: createChatDTO, @Res() res: Response) {
    const newChat = await this.chatService.createChat({
      category: body.category,
      name: body.name,
      description: body.description,
    });

    res.status(201).send({
      statusCode: HttpStatus.CREATED,
      content: {
        newChat,
      },
    });
  }
}
