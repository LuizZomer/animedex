import { HttpStatus } from '@nestjs/common';

export class GlobalError extends Error {
  private type: string;
  private statusCode: number;
  private content: object;

  constructor(err: {
    message: string;
    type?: string;
    statusCode?: number;
    content: object;
  }) {
    super(err.message);
    this.name = 'GlobalError';
    this.type = err.type || 'generic_error';
    this.statusCode = err.statusCode || HttpStatus.BAD_REQUEST;
    this.content = err.content;
  }

  getErrorType(): string {
    return this.type;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getContent(): object {
    return this.content;
  }
}
