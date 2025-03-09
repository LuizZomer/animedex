import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class ChatPhotoSaveUseCase {
  async execute(photo: Express.Multer.File) {
    const extension = extname(photo.originalname);
    const filename = `${randomUUID()}${extension}`;

    const filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'storage',
      'chat',
      filename,
    );
    await fs.writeFile(filePath, photo.buffer).catch((err) => {
      throw err;
    });

    return `/storage/chat/${filename}`;
  }
}
