import { Request, Response, NextFunction } from 'express';

export const trim = (property: keyof Request & 'body' | 'params') => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const trimPair = (acc: object, [k, v]: [string, any]) => ({
    ...acc,
    [k]: typeof v === 'string' ? v.trim() : v,
  });
  req[property] = Object.entries(req[property]).reduce(trimPair, {});
  next();
};
