import { Injectable } from '@nestjs/common';
import { createChatDTO } from '../../presentation/dto/create-chat.dto';
import { ChatGateway } from '../../gateway/chat-gateway.prisma';
import { FileService } from 'src/module/file/file.service';

@Injectable()
export class CreateChatUseCase {
  constructor(
    private readonly chatGateway: ChatGateway,
    private readonly fileService: FileService,
  ) {}

  async execute(chatData: createChatDTO) {
    const pathFile = await this.fileService.chatPhotoSave(chatData.photo);
    return this.chatGateway.createChat({
      ...chatData,
      photo: pathFile,
      tags: chatData.tags,
    });
  }
}
