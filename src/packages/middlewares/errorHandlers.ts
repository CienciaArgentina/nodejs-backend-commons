import { Request, Response, NextFunction, Router } from 'express';
import { clientError, notFoundError, serverError } from '..';

const handle404Error = (router: Router): void => {
  router.use((req: Request, res: Response) => {
    notFoundError();
  });
};

const handleClientError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    clientError(err, res, next);
  });
};

const handleServerError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
