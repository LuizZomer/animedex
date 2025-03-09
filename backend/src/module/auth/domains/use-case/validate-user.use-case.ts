import { Injectable } from '@nestjs/common';
import { UserService } from 'src/module/user/domains/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userService: UserService) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  async execute(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
