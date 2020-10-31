import { Response, NextFunction } from 'express';
import { HTTPClientError } from '.';
import { logger } from '..';
import { HttpStatusErrorCode, Environment, ErrorDescription, ErrorCode } from '../../commons/constants';
import { v1 as uuidv1 } from 'uuid';

export const clientError = (err: Error, res: Response, next: NextFunction): void => {
  logger.info(err);
  if (err instanceof HTTPClientError) {
    const { id, status, message, errors } = err;
    res.status(err.status).send({
      id: id,
      status: status,
      message: message,
      errors: errors,
    });
    return next();
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
