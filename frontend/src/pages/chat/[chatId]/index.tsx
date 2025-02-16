import { PublicChatMessages } from "@/components/Pages/PublicChat";
import { PubliChatProvider } from "@/context/WebSocket/publicChat/PubliChatProvider";

const PublicChat = () => {
  return (
    <PubliChatProvider>
      <PublicChatMessages />
    </PubliChatProvider>
  );
};

export default PublicChat;
