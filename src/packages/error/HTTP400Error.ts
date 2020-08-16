import { HTTPClientError } from './HTTPClientError';
import { HttpStatusErrorCode, ErrorCode, ErrorDescription } from '../../commons/constants';
import { ValidationError } from './'

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

  constructor(message: object | string = ErrorDescription.Unauthorized) {
    super(message, ErrorCode.Unauthorized);
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.NotFound;

  constructor(message: object | string = ErrorDescription.NotFound) {
    super(message, ErrorCode.NotFound);
  }
}
