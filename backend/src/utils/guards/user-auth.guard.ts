import { AuthGuard } from '@nestjs/passport';

export class UserAuth extends AuthGuard('local-user') {}
