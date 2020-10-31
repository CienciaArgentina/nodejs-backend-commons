import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { logger } from '..';
import http from 'http';
import https from 'https';

const handleResponse = <T>(response: AxiosResponse): T => {
  logger.info({
    config: response.config,
    data: response.data,
    headers: response.headers,
  });

  return response?.data;
};

const handleError = (error: AxiosError): Promise<void> => {
  logger.error(error);
  return Promise.reject(error);
};

const initializeResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(handleResponse, handleError);
};

export const httpClient = (url: string, handleResponse = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    timeout: 60000,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxRedirects: 10,
    maxContentLength: 50 * 1000 * 1000, //50MBs
  });
  if (handleResponse) initializeResponseInterceptor(instance);
  return instance;
};
