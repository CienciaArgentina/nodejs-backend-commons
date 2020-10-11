import { Request, Response, Router, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP400Error } from '../error';

export const authMiddleware = (router: Router): void => {
  router.use((req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['access-token'];
 
    if (!token) throw new HTTP400Error();
    
    res.locals.jwt = jwt.verify(token, process.env.JWT_SIGNATURE || ''); 
    next();
})};
