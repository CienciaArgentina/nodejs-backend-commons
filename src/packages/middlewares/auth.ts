import { Request, Response, Router, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP400Error } from '../error';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path === process.env.READINESS || req.path === process.env.LIVENESS || process.env.DONT_APPLY_AUTH)
      return next();

    const token = <string>req.headers['access-token'];

    if (!token) throw new HTTP400Error();

    res.locals.jwt = jwt.decode(token);
    next();
  });
};
