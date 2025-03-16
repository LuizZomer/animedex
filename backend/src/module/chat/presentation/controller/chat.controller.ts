import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { responseWithUser } from 'src/@types/response/responseWithUser';
import { JwtAuth } from 'src/utils/guards/jwt-auth.guard';
import { ChatServices } from '../../domains/chat.service';
import { createChatDTO } from '../dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatServices) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllChats(
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    const content = await this.chatService.listAllChats({ take, page });

    return {
      statusCode: HttpStatus.OK,
      content,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('messages/:chatId')
  async findAllChatMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    const allMessages = await this.chatService.listAllChatMessages(chatId);

    return {
      statusCode: HttpStatus.OK,
      content: allMessages,
    };
  }

  @UseGuards(JwtAuth)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createChat(
    @Body() body: createChatDTO,
    @UploadedFile() file: Express.Multer.File,
    @Req() res: responseWithUser,
  ) {
    const newChat = await this.chatService.createChat(
      {
        category: body.category,
        name: body.name,
        description: body.description,
        photo: file,
        tags: JSON.parse(body.tags as unknown as string),
        isPublic: body.isPublic,
        accessUser: Array.isArray(body.accessUser)
          ? body.accessUser
          : JSON.parse(body.accessUser),
      },
      res.user,
    );

    return {
      statusCode: HttpStatus.CREATED,
      content: {
        newChat,
      },
    };
  }
}
