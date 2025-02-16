import { createContext } from "react";
import { Socket } from "socket.io-client";
import { IMessage } from "./PubliChatProvider";

interface IWebSocketContext {
  socket: Socket | null;
  sendMessage: ({ message, room }: ISendMessage) => void;
  joinRoom: (room: number) => void;
  leaveRoom: (room: number) => void;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

export const PublicChatContext = createContext<IWebSocketContext>({
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  socket: null,
  messages: [],
  setMessages: () => {},
});
