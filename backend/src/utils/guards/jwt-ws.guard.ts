import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtWsGuard extends AuthGuard('jwt-auth') {
  getRequest(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    console.log('b');

    // Criamos um "fake request" para o Passport extrair o token corretamente
    return {
      headers: {
        authorization:
          client.handshake?.headers?.authorization ||
          `Bearer ${client.handshake?.auth?.token}`,
      },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isValid = (await super.canActivate(context)) as boolean;
    console.log('a');

    if (isValid) {
      const client = context.switchToWs().getClient();
      client.user = context.switchToHttp().getRequest().user; // Associamos o usuário ao WebSocket
    }

    return isValid;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new WsException('Token inválido ou não autorizado');
    }
    return user;
  }
}
