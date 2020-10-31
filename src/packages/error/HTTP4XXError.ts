import { HTTPClientError } from './HTTPClientError';
import { HttpStatusErrorCode } from '../../commons/constants';
import { CienciaError, HttpCienciaError } from '.';

export class HTTPCienciaError extends HTTPClientError {
  statusCode!: HttpStatusErrorCode;
  readonly validationErrors?: HttpCienciaError;

  constructor(statusCode: HttpStatusErrorCode, message: string = 'ciencia_error', cienciaErrors?: CienciaError[]) {
    super(message, statusCode, cienciaErrors);
  }
}

export const notFoundError = (): void => {
  throw new HTTPCienciaError(HttpStatusErrorCode.NotFound, 'error');
};
