import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserDTO } from './dto/Create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ email, password, username }: CreateUserDTO) {
    try {
      return await this.prisma.user.create({
        data: {
          email,
          username,
          password: await bcrypt.hash(password, await bcrypt.genSalt()),
        },
      });
    } catch (error) {
      // 🔥 Tratamento específico para erro de UNIQUE CONSTRAINT
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            `O campo '${error.meta?.target}' já está em uso.`,
          );
        }
      }
      throw error; // Caso seja outro erro, deixe ser tratado globalmente
    }
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
