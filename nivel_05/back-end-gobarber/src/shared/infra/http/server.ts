import 'reflect-metadata';
import 'dotenv/config';


import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import rateLimiter from './middlewares/rateLimiter';
import Route from './routes';

import uploadConfig from '@config/upload';

import '@shared/infra/typeorm/index';
import '@shared/container/index';

import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(rateLimiter);
app.use(Route);

app.use(errors());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
