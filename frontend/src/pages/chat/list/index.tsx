import { ChatCard } from "@/components/Cards/ChatCard";
import { CreateChatResponsiveOverlay } from "@/components/ResponsiveOverlay/CreateChatResponsiveOverlay";
import { useAuthContext } from "@/context/Auth/useAuthContext";
import { getAllChats } from "@/services/chat/get-all-chats";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ChatList = () => {
  const { user } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["all-chats"],
    queryFn: async () => getAllChats(),
  });

  return (
    <div className="p-2 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div>
          {user && (
            <div>
              <h2>Olá {user?.username}!</h2>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.photo}`}
                alt="foto"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
        <CreateChatResponsiveOverlay />
      </div>
      <div className="flex flex-col gap-2">
        {data?.map((dataCard) => (
          <ChatCard key={dataCard.id} data={dataCard} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
