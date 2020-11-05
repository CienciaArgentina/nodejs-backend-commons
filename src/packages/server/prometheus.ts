import { Request, Response } from 'express';
import client, { collectDefaultMetrics } from 'prom-client';

client.collectDefaultMetrics;
//TODO: This prom-client version has an issue, if you write service_name like 'ciencia-api' the microservice can't run

const prefix = process.env.SERVICE_NAME || 'ciencia_api';
collectDefaultMetrics({ prefix });

export default [
  {
    path: '/metrics',
    method: 'get',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        res.set('Content-Type', client.register.contentType);
        res.send(client.register.metrics());
      },
    ],
  },
];
