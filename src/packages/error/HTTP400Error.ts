import { HTTPClientError } from './HTTPClientError';
import { HttpStatusErrorCode, ErrorCode, ErrorDescription } from '../../commons/constants';
import { ValidationError } from './'

export class HttpValidationError extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.BadRequest;
  readonly validationErrors?: ValidationError;

  constructor(
    message: ValidationError
  ) {
    super(message, HttpStatusErrorCode.BadRequest.toString());
    this.validationErrors = message;
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = HttpStatusErrorCode.BadRequest;

  constructor(
    message: object | string = ErrorDescription.BadRequest,
    code: string = ErrorCode.BadRequest
  ) {
    super(message, code);
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
