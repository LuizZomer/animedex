import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDTO } from '../presentation/dtos/create-user.dto';
import { IUserProfileOutput } from '../presentation/dtos/user-profile.output';
import { GetOneUserUseCase } from './use-case/get-one-user.use-case';
import { GetUserProfileUseCase } from './use-case/get-user-profile.use-case';
import { RegisterUseCase } from './use-case/register.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
  ) {}

  async createUser({ email, password, username, photo }: CreateUserDTO) {
    return this.registerUseCase.execute({ email, password, photo, username });
  }

  async getProfile(username: string): Promise<IUserProfileOutput> {
    return this.getUserProfileUseCase.execute(username);
  }

  async findOne(username: string): Promise<User | null> {
    return this.getOneUserUseCase.execute(username);
  }
}
