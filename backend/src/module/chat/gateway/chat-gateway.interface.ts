import { Chat, ChatLine } from '@prisma/client';
import { ICreateChatLine } from 'src/@types/chatLine/createChatLine.interface';
import { ListAllMessagesOutput } from '../presentation/dto/listAllMessages.output';
import { IChatTagsDTO } from '../presentation/dto/chatTags.dto';

export class ChatGatewayInterface {
  createChat: (
    chatData: Pick<Chat, 'category' | 'description' | 'name' | 'photo'>,
    tags: IChatTagsDTO[],
  ) => Promise<Chat>;
  createChatLine: (chatLine: ICreateChatLine) => Promise<ChatLine>;
  listAllChatMessagesByChatId: (
    chatId: number,
  ) => Promise<ListAllMessagesOutput[]>;
  findAllChatsWithRelation: () => Promise<Chat[]>;
}
