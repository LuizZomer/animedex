import { Chat, ChatLine } from '@prisma/client';
import { ICreateChatLine } from 'src/@types/chatLine/createChatLine.interface';
import { ListAllMessagesOutput } from '../presentation/dto/listAllMessages.output';
import { IChatTagsDTO } from '../presentation/dto/chatTags.dto';
import { AllChatsOutput } from 'src/@types/chats/allChatsOutput';

export class ChatGatewayInterface {
  createChat: (
    chatData: Pick<Chat, 'category' | 'description' | 'name' | 'photo'>,
    tags: IChatTagsDTO[],
  ) => Promise<Chat>;
  createChatLine: (chatLine: ICreateChatLine) => Promise<ChatLine>;
  listAllChatMessagesByChatId: (
    chatId: number,
  ) => Promise<ListAllMessagesOutput[]>;
  findAllChatsWithRelation: ({
    take,
    page,
  }: {
    page: number;
    take: number;
  }) => Promise<AllChatsOutput>;
}
