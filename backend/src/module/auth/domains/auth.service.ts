import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUseCase } from './use-case/login.use-case';
import { ValidateUserUseCase } from './use-case/validate-user.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async validateUser(username: string, password: string) {
    return this.validateUserUseCase.execute(username, password);
  }

  login(user: User) {
    return this.loginUseCase.execute(user);
  }
}
