import { randomUUID } from 'crypto';
import * as fs from 'fs/promises';
import { join, extname } from 'path';

export class UserProfilePhotoSaveUseCase {
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
      'user',
      'profilePhoto',
      filename,
    );
    await fs.writeFile(filePath, photo.buffer).catch((err) => {
      throw err;
    });

    return `/storage/user/profilePhoto/${filename}`;
  }
}
