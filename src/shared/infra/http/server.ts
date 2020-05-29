import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';

import UploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';

import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use(cors());
app.use('/files', express.static(UploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🚀 Server started on port 3333'));
