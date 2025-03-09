import { FileService } from 'src/module/file/file.service';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { CreateUserDTO } from '../../presentation/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userGateway: UserGateway,
    private readonly fileService: FileService,
  ) {}

  async execute({ email, password, photo, username }: CreateUserDTO) {
    const photoPath = await this.fileService.userProfilePhotoSave(photo);
    return this.userGateway.createUser({
      email,
      username,
      password: await bcrypt.hash(password, await bcrypt.genSalt()),
      perfilPhoto: photoPath,
    });
  }
}
