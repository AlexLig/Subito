import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/HttpError';

export default function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({
    status,
    message,
  });
}
