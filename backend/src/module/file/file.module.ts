import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { UserProfilePhotoSaveUseCase } from './use-case/user-profile-photo-save.use-case';
import { ChatPhotoSaveUseCase } from './use-case/chat-photo-save.use-case';

@Module({
  providers: [FileService, UserProfilePhotoSaveUseCase, ChatPhotoSaveUseCase],
  exports: [FileService],
})
export class FileModule {}
