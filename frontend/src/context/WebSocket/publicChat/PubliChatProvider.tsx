import { useEffect, useState } from "react";
import { PublicChatContext } from "./CreatePublicChatContext";
import { io, Socket } from "socket.io-client";
import { parseCookies } from "nookies";

const WS_URL = "http://localhost:80/api/chat"; // URL do servidor WebSocket

export interface IMessage {
  id: number;
  message: string;
  User: {
    username: string;
    id: number;
  };
  createdAt: string;
}

export const PubliChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { "animedex.token": token } = parseCookies();

  useEffect(() => {
    const newSocket = io(WS_URL, { withCredentials: true, auth: { token } });

    newSocket.on("connect", () => {
      console.log("Conectado");

      setSocket(newSocket);
    });

    newSocket.on("newMessage", (res) => {
      console.log(res);

      setMessages((prev) => [...prev, res]);
    });

    newSocket.on("disconnect", () => {
      console.log("Desconectado");

      setSocket(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = ({ message, room }: ISendMessage) => {
    if (socket) {
      console.log("a");

      socket.emit("newMessage", { message, room });
    } else {
      console.warn("Sem conexão disponivel!");
    }
  };

  const joinRoom = (room: number) => {
    if (socket) {
      socket.emit("joinRoom", room);
    } else {
      console.warn("Sem conexão disponivel!");
    }
  };

  const leaveRoom = (room: number) => {
    if (socket) {
      socket.emit("leaveRoom", room);
    } else {
      console.warn("Sem conexão disponivel!");
    }
  };

  return (
    <PublicChatContext.Provider
      value={{
        socket,
        sendMessage,
        joinRoom,
        leaveRoom,
        messages,
        setMessages,
      }}
    >
      {children}
    </PublicChatContext.Provider>
  );
};
