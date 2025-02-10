import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalError } from '../exceptions/global-error.exception';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException && error.getResponse()) {
          const response: any = error.getResponse();
          if (response.message && typeof response.message === 'object') {
            const messages = Object.values(response.message);
            const firstErrorMessages = messages.map(
              (message: string | string[]) => {
                if (Array.isArray(message)) {
                  return message[0];
                }
                throw new GlobalError({
                  ...response,
                  message,
                  type: 'invalid_dto',
                });
              },
            );
            throw new BadRequestException(firstErrorMessages[0]);
          }
        }
        throw error;
      }),
    );
  }
}
