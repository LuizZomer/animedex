import { Type } from 'class-transformer';
import {
  IsArray,
  IsBooleanString,
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

  @IsBooleanString()
  isPublic: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IChatTagsDTO)
  tags: IChatTagsDTO[];

  @IsOptional()
  photo: Express.Multer.File;

  @IsArray()
  @IsString({ each: true, message: 'Precisa ser passado o externalId' })
  accessUser: string[];
}
