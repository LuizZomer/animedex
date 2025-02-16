import { ChatCard } from "@/components/Cards/ChatCard";
import { useAuthContext } from "@/context/Auth/useAuthContext";
import { getAllChats } from "@/services/chat/get-all-chats";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { user } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["all-chats"],
    queryFn: async () => getAllChats(),
  });

  return (
    <div>
      <div className="flex items-center gap-3">
        <h2>Olá {user?.username}!</h2>
      </div>
      {data?.map((dataCard) => (
        <ChatCard key={dataCard.id} data={dataCard} />
      ))}
    </div>
  );
};

export default ChatList;
