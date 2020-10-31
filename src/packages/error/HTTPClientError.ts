import { HttpStatusErrorCode } from '../../commons/constants';
import { v1 as uuidv1 } from 'uuid';
import { CienciaError } from './ValidationError';

export abstract class HTTPClientError extends Error {
  readonly id!: string;
  readonly status!: HttpStatusErrorCode;
  readonly message!: string;
  readonly errors!: CienciaError[] | null;

  constructor(message: string, statusCode: HttpStatusErrorCode, cienciaErrors?: CienciaError[] | null) {
    super(message);
    this.id = uuidv1();
    this.status = statusCode;
    this.message = message;
    this.errors = cienciaErrors || null;

    Error.captureStackTrace(this, this.constructor);
  }
}
