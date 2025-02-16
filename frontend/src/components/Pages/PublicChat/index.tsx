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
      console.log(data.content);
    });
  };

  useEffect(() => {
    if (!socket) return;
    joinRoom(Number(chatId));

    return () => {
      leaveRoom(Number(chatId));
    };
  }, [socket, chatId]);

  useEffect(() => {
    if (chatId) getAllMessage();
  }, [chatId]);

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <div className="flex flex-col w-full gap-3 p-3">
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
      </div>
      <div className="flex gap-2">
        <Input onChange={({ target }) => setNewMessage(target.value)} />
        <Button
          disabled={newMessage.length < 1}
          onClick={() =>
            sendMessage({ message: newMessage, room: Number(chatId) })
          }
        >
          -&gt;
        </Button>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};
