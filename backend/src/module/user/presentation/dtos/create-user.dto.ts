import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'O username é obrigatório' })
  username: string;

  @IsString({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'A senha é obrigatória ' })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 0,
      minUppercase: 0,
      minSymbols: 0,
    },
    {
      message:
        'Sua senha não é forte o suficiente, a senha deve possuir 1 número e no minimo 8 caracteres',
    },
  )
  password: string;

  photo: Express.Multer.File;
}
