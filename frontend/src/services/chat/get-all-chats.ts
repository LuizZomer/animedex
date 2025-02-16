import { api } from "../api";

export const getAllChats = async (): Promise<IChat[]> => {
  const res = await api.get("/api/chat");

  return res.data.content;
};
