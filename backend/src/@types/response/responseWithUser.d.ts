import { User } from '@prisma/client';
import { Response } from 'express';

interface responseWithUser extends Response {
  user: User;
}
