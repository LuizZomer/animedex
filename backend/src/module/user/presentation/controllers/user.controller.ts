import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuth } from 'src/utils/guards/jwt-auth.guard';
import { UserService } from '../../domains/user.service';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('photo'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() { email, password, username }: CreateUserDTO,
  ) {
    return this.userService.createUser({
      email,
      password,
      username,
      photo: file,
    });
  }

  @UseGuards(JwtAuth)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user.username as string);
  }
}
