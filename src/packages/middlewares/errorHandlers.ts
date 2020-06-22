import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../error/ErrorHandler';

export const handle404Error = (router: Router): void => {
  router.use((req: Request, res: Response) => {
    ErrorHandler.notFoundError();
  });
};

export const handleClientError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next);
  });
};

export const handleServerError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};
