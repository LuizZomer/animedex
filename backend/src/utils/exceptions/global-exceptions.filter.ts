import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { GlobalError } from './global-error.exception';
import { Response } from 'express';

@Catch(GlobalError)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: GlobalError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const status =
      exception.getStatusCode() || HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      error: {
        type: exception.getErrorType(),
        message: exception.message || 'Erro interno',
        content: exception.getContent() || undefined,
      },
    };

    res.status(status).json(errorResponse);
  }
}
