import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';
import { HttpError } from '../utils/HttpError';

export const validateReq = (dto: any, validateOtions?: ValidatorOptions) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const dtoInstance = plainToClass(dto, req.body);
  const errors = await validate(dtoInstance, {
    whitelist: true,
    forbidUnknownValues: true,
    ...validateOtions,
  });
  if (errors.length > 0) return next(new HttpError(400, `Bad Request.\n${errors}`));

  req.body = dtoInstance;
  next();
};
