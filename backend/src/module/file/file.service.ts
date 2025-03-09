import { Injectable } from '@nestjs/common';
import { UserProfilePhotoSaveUseCase } from './use-case/user-profile-photo-save.use-case';
import { ChatPhotoSaveUseCase } from './use-case/chat-photo-save.use-case';

@Injectable()
export class FileService {
  constructor(
    private readonly userProfilePhotoSaveUseCase: UserProfilePhotoSaveUseCase,
    private readonly chatPhotoSaveUseCase: ChatPhotoSaveUseCase,
  ) {}

  async userProfilePhotoSave(file: Express.Multer.File) {
    return this.userProfilePhotoSaveUseCase.execute(file);
  }

  async chatPhotoSave(file: Express.Multer.File) {
    return this.chatPhotoSaveUseCase.execute(file);
  }
}
