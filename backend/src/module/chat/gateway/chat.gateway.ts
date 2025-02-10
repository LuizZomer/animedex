import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtWsGuard } from 'src/utils/guards/jwt-ws.guard';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Injectable, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

interface AuthenticatedSocket extends Socket {
  user?: User;
}

@WebSocketGateway(80, { namespace: 'api/chat' })
@Injectable()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
    try {
      const token =
        client.handshake?.headers?.authorization?.split(' ')[1] ||
        client.handshake?.auth?.token;

      console.log(token);

      if (!token) {
        throw new WsException('Token não encontrado');
      }

      // 🔥 Valida o token manualmente
      const payload = this.jwtService.verify(token, {
        secret: 'dsjfoksjfskldkdkasmdlkasdmlkasmdlkasmdas,cd[assaxçsa;xsça;x]',
      });
      client.user = payload;

      console.log('Usuário conectado:', payload);
    } catch (error) {
      console.error('Erro na conexão WebSocket:', error.message);
      client.disconnect(); // Desconecta o cliente se falhar
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { room: number },
  ) {
    client.join(String(data.room));
    client.emit('Entrou na sala', { room: data.room });
  }

  @UseGuards(JwtService)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { room: number },
  ) {
    client.leave(String(data.room));
    client.emit('leftRoom', { room: data.room });
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('message')
  sendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    payload: { message: string; user: { id: number }; room: number },
  ) {
    const { message, room } = payload;

    this.server
      .to(String(room))
      .emit('message', { message, sendUser: client.user });
  }
}
