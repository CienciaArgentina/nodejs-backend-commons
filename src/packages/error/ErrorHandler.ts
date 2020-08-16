import { Response, NextFunction } from 'express';
import { HTTPClientError } from './HTTPClientError';
import { HTTP401Error, HTTP404Error,HTTP400Error } from './HTTP400Error';
import { logger } from '../';
import { HttpStatusErrorCode, ErrorDescription, ErrorCode } from '../../commons/constants';
import  { ValidationError } from './ValidationError';

export const notFoundError = (): void => {
  throw new HTTP404Error();
};

export const unauthorizedError = (): void => {
  throw new HTTP401Error();
};

export const clientError = (err: Error, res: Response, next: NextFunction): void => {
  if (err instanceof HTTPClientError) {
    let errorResponse: object | ValidationError[] | string | undefined = {
      message: err.message,
      code: err.code,
    };

    if ((err instanceof HTTP400Error) && err.validationErrors)
      errorResponse = err.validationErrors;

    logger.warn({ errorResponse });
    res.status(err.statusCode).send(errorResponse);
  } else {
    next(err);
  }
};

const productionEnv = 'production';
export const serverError = (err: Error, res: Response, next: NextFunction): void => {
  logger.error({err});
  if (process.env.NODE_ENV === productionEnv) {
    res.status(HttpStatusErrorCode.InternalServerError).send(ErrorDescription.InternalServerError);
  } else {
    res.status(HttpStatusErrorCode.InternalServerError).send({
      message: err.message,
      code: ErrorCode.InternalServerError,
    });
  }
};
