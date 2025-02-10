import { AuthGuard } from '@nestjs/passport';

export class JwtAuth extends AuthGuard('jwt-auth') {}
