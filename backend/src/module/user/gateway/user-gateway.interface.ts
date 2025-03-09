import { User } from '@prisma/client';

export class UserGatewayInterface {
  createUser: (
    userData: Pick<User, 'email' | 'password' | 'perfilPhoto' | 'username'>,
  ) => Promise<User>;
  findOneUserByUsername: (username: string) => Promise<User | null>;
}
