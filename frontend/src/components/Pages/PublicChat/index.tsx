import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/Auth/useAuthContext";
import { usePubliChatContext } from "@/context/WebSocket/publicChat/usePubliChatContext";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export const PublicChatMessages = () => {
  const { query } = useRouter();
  const { user } = useAuthContext();
  const { chatId } = query as { chatId: string };
  const { joinRoom, leaveRoom, sendMessage, socket, setMessages, messages } =
    usePubliChatContext();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getAllMessage = async () => {
    await api.get(`api/chat/messages/${chatId}`).then(({ data }) => {
      setMessages(data.content);
    });
  };

  const handleSendMessage = () => {
    sendMessage({ message: newMessage, room: Number(chatId) });
    setNewMessage("");
  };

  useEffect(() => {
    if (!socket || !chatId) return;

    getAllMessage();

    joinRoom(Number(chatId));

    return () => leaveRoom(Number(chatId));
  }, [socket, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="flex flex-col w-full gap-3 p-5  h-[95vh] overflow-auto">
        {messages.map(({ message, User, createdAt, id }) => (
          <div
            key={id}
            className={`w-full flex  ${
              User.username === user?.username ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`border rounded-md w-[500px] p-2`}>
              <span>{User.username}</span>
              <p>{message}</p>
              <span>{new Date(createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 px-4">
        <Input
          onChange={({ target }) => setNewMessage(target.value)}
          value={newMessage}
          placeholder=""
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button disabled={newMessage.length < 1} onClick={handleSendMessage}>
          Enviar
        </Button>
      </div>
    </div>
  );
};
