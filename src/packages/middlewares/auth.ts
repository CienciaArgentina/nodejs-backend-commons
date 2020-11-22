import { Request, Response, NextFunction, Handler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { httpClient } from '../httpClient';
import { HttpStatusErrorCode } from '../../commons/constants';
import { HTTPCienciaError } from '../error';
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
      const response = e.response;
      const errors = response?.data.errors;
      if (response?.status === HttpStatusErrorCode.Unauthorized)
        throw new HTTPCienciaError(HttpStatusErrorCode.Unauthorized, 'apicall.error', errors);
      if (response?.status === HttpStatusErrorCode.BadRequest)
        throw new HTTPCienciaError(HttpStatusErrorCode.BadRequest, 'apicall.error', errors);
      throw new Error(e);
    });
};

export const authMiddleware = (claim?: string): Handler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['authorization'];
    if (!token) throw new HTTPCienciaError(HttpStatusErrorCode.BadRequest);

    await verifyJwt(token, claim);

    res.locals.jwt = jwt.decode(token);
    next();
  };
};
