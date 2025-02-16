import { useContext } from "react";
import { PublicChatContext } from "./CreatePublicChatContext";

export const usePubliChatContext = () => {
  const usePublicChatContext = useContext(PublicChatContext);

  return usePublicChatContext;
};
