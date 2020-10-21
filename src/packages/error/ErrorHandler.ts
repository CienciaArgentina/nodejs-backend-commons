import { Response, NextFunction } from 'express';
import { HTTP400Error, HTTPClientError, HttpValidationError, ValidationError } from '.';
import { logger } from '..';
import { HttpStatusErrorCode, Environment, ErrorDescription, ErrorCode } from '../../commons/constants';
import { v1 as uuidv1 } from 'uuid';

export const clientError = (err: Error, res: Response, next: NextFunction): void => {
  if (err instanceof HTTPClientError) {
    let errorResponse: object | ValidationError | string | undefined = {
      message: err.message,
      code: err.code,
    };

    if (err instanceof HttpValidationError) errorResponse = err.validationErrors;

    logger.warn({ errorResponse });
    res.status(err.statusCode).send(errorResponse);
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction): void => {
  const errorId = uuidv1();
  logger.error({
    id: errorId,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  if (process.env.NODE_ENV === Environment.Production) {
    res.status(HttpStatusErrorCode.InternalServerError).send({
      id: errorId,
      message: ErrorDescription.InternalServerError,
      code: ErrorCode.InternalServerError,
    });
  } else {
    res.status(HttpStatusErrorCode.InternalServerError).send({
      message: err.message,
      code: ErrorCode.InternalServerError,
    });
  }
};
