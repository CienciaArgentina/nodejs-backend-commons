import { HTTPClientError } from './HTTPClientError';
import { HttpStatusErrorCode, ErrorCode, ErrorDescription } from '../../commons/constants';
import { ValidationError } from '.';

export class HttpValidationError extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.BadRequest;
  readonly validationErrors?: ValidationError;

  constructor(message: ValidationError) {
    super(message, HttpStatusErrorCode.BadRequest.toString());
    this.validationErrors = message;
  }
}
export class HTTP400Error extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.BadRequest;
  readonly validationErrors?: ValidationError[];

  constructor(
    message: ValidationError[] | object | string = ErrorDescription.BadRequest,
    code: string = ErrorCode.BadRequest
  ) {
    super(message, code);
    if (message instanceof Array) this.validationErrors = message;
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.Unauthorized;

  constructor(message: object | string = ErrorDescription.Unauthorized, code: string = ErrorCode.Unauthorized) {
    super(message, code);
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.Forbidden;

  constructor(message: object | string = ErrorDescription.Forbidden, code: string = ErrorCode.Forbidden) {
    super(message, code);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.NotFound;

  constructor(message: object | string = ErrorDescription.NotFound, code: string = ErrorCode.NotFound) {
    super(message, code);
  }
}

export const notFoundError = (): void => {
  throw new HTTP404Error();
};

export const unauthorizedError = (): void => {
  throw new HTTP401Error();
};

export const badRequestError = (): void => {
  throw new HTTP400Error();
};
