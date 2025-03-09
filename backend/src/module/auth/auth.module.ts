import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './domains/auth.service';
import { ValidateUserUseCase } from './domains/use-case/validate-user.use-case';
import { LoginUseCase } from './domains/use-case/login.use-case';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'dsjfoksjfskldkdkasmdlkasdmlkasmdlkasmdas,cd[assaxçsa;xsça;x]',
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ValidateUserUseCase,
    LoginUseCase,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
