import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CATEGORIES } from 'src/utils/enums/chat-categories.enum';
import { IChatTagsDTO } from './chatTags.dto';

export class createChatDTO {
  @IsString({ message: 'Nome é obrigatório' })
  name: string;

  @IsString({ message: 'Descrição é obrigatório' })
  description: string;

  @IsEnum(CATEGORIES, { message: 'Categoria não existente' })
  category: CATEGORIES;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IChatTagsDTO)
  tags: IChatTagsDTO[];

  @IsOptional()
  photo: Express.Multer.File;
}
