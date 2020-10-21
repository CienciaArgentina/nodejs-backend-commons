import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { logger } from '..';
import { HTTPClientError } from '../error/HTTPClientError';

export class HTTPApiCallError extends HTTPClientError {
  readonly statusCode!: number;
  readonly errorRequest?: AxiosError;
  constructor(message: object, statusCode: number, code: string, error?: AxiosError) {
    super(message, code);
    this.errorRequest = error;
    this.statusCode = statusCode;
  }
}

const handleResponse = <T>(response: AxiosResponse): T => {
  logger.info({
    config: response.config,
    data: response.data,
    headers: response.headers,
  });

  return response?.data;
};

const handleError = (error: AxiosError): Promise<void> => {
  if (error.response && error.response.status) {
    logger.error(error);
    throw new HTTPApiCallError(error.response.data, error.response.status, error.response.data.code, error);
  }

  return Promise.reject(error);
};

const initializeResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(handleResponse, handleError);
};

export const httpClient = (url: string, handleResponse = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
  });
  if (handleResponse) initializeResponseInterceptor(instance);
  return instance;
};
