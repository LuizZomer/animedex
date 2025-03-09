import { User } from '@prisma/client';
import { UserGateway } from '../../gateway/user-gateway.prisma';
import { IUserProfileOutput } from '../../presentation/dtos/user-profile.output';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserProfileUseCase {
  constructor(private readonly userGateway: UserGateway) {}

  async execute(username: string): Promise<IUserProfileOutput> {
    const userData = await this.userGateway.findOneUserByUsername(username);

    if (!userData)
      throw new BadRequestException('Perfil de usuário não encontrado!');

    return this.profileMapper(userData);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  profileMapper(userData: User): IUserProfileOutput {
    const { password, id, ...rest } = userData;
    return {
      ...rest,
    };
  }
}
