import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { HttpError } from '../utils/httpError';
import { Employee } from '../employee/entity';
import { Employer } from '../employer/entity';

export const isUniqueVat = (entity: 'Employer' | 'Employee') => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.vat) return next();

  const duplicate = (await getRepository(entity).findOne({
    vat: req.body.vat,
  })) as Employer | Employee;
  if (!duplicate || duplicate.id.toString() === req.params.id) return next();

  next(new HttpError(409, 'Vat must be unique.'));
};
