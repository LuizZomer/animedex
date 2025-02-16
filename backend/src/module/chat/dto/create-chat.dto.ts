import { IsEnum, IsString } from 'class-validator';
import { Categories } from 'src/utils/enums/chat-categories.enum';

export class createChatDTO {
  @IsString({ message: 'Nome é obrigatório' })
  name: string;

  @IsString({ message: 'Descrição é obrigatório' })
  description: string;

  @IsEnum(Categories, { message: 'Categoria não existente' })
  category: Categories;
}
