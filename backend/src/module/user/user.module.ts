import { Module } from '@nestjs/common';
import { UserService } from './domains/user.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { FileModule } from '../file/file.module';
import { UserController } from './presentation/controllers/user.controller';
import { UserGateway } from './gateway/user-gateway.prisma';
import { RegisterUseCase } from './domains/use-case/register.use-case';
import { GetUserProfileUseCase } from './domains/use-case/get-user-profile.use-case';
import { GetOneUserUseCase } from './domains/use-case/get-one-user.use-case';
import { FindAllUserUseCase } from './domains/use-case/find-all-users.use-case';

@Module({
  imports: [FileModule],
  providers: [
    UserService,
    PrismaService,
    UserGateway,
    RegisterUseCase,
    GetUserProfileUseCase,
    GetOneUserUseCase,
    FindAllUserUseCase,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
