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
import { ChatServices } from '../domains/chat.service';

interface AuthenticatedSocket extends Socket {
  user?: User;
}

@WebSocketGateway(80, {
  namespace: 'api/chat',
  cors: { origin: 'http://localhost:4000', credentials: true },
})
@Injectable()
export class ChatGatewayWebSocket implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatService: ChatServices,
  ) {}

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
    @MessageBody() room: number,
  ) {
    console.log(`usuario: ${client.user?.username} Entrou na sala ${room}`);
    client.join(String(room));
    client.emit('Entrou na sala', { room });
  }

  @UseGuards(JwtService)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() room: number,
  ) {
    client.leave(String(room));
    client.emit('leftRoom', { room });
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('newMessage')
  async sendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    payload: { message: string; room: number },
  ) {
    const { message, room } = payload;

    const messageData = await this.chatService.sendMessage({
      chatId: room,
      message,
      userId: client.user!.id,
    });

    this.server.to(String(room)).emit('newMessage', {
      message: messageData.message,
      User: { id: client.user?.id, username: client.user?.username },
      createdAt: messageData.createdAt,
      id: messageData.id,
    });
  }
}
