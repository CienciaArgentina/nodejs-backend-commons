import { Request, Response, NextFunction, Handler } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP400Error, HTTP401Error } from '../error';
import dotenv from 'dotenv';
import { httpClient } from '../httpClient';
import { HttpStatusErrorCode } from '../../commons/constants';
dotenv.config();

const verifyJwt = async (jwt: string, claim?: string): Promise<void> => {
  const host = process.env.CERBERO_HOST || 'https://api.cienciaargentina.dev';
  const path = process.env.CERBERO_PATH || '/forward-auth';
  const request = httpClient(host);
  await request
    .post(path, {
      jwt: jwt,
      required_claim: claim,
    })
    .catch((e) => {
      const message = e.errorRequest.response.data.message;
      if (e.statusCode === HttpStatusErrorCode.Unauthorized) throw new HTTP401Error(message);
      if (e.statusCode === HttpStatusErrorCode.BadRequest) throw new HTTP400Error(message);
      throw new Error(e);
    });
};

export const authMiddleware = (claim?: string): Handler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['authorization'];
    if (!token) throw new HTTP400Error();

    await verifyJwt(token, claim);

    res.locals.jwt = jwt.decode(token);
    next();
  };
};
