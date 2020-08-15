import http from 'http';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes } from './util';
import { logger } from '../';
import middlewares from '../middlewares';
import errorHandlers from '../middlewares/errorHandlers';
import { Route,Wrapper } from './types';

const app = express();

export const startServer = (
  port: number,
  routes: Route[],
  customizablesMiddlewares?: Wrapper[],
  applyCommonsMiddlewares = true,
  applyCommonsErrors = true
): void => {
  if (applyCommonsMiddlewares) applyMiddleware(middlewares, app);
  if (customizablesMiddlewares) applyMiddleware(customizablesMiddlewares, app);
  applyRoutes(routes, app);
  if (applyCommonsErrors) applyMiddleware(errorHandlers, app);

  const server = http.createServer(app);
  server.listen(port, () => logger.info(`Server is running ${port}`));
};