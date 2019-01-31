import { NextFunction, Request, Response } from 'express';
import { Document, Model } from 'mongoose';

interface IOptions<T extends Document> {
  collection: Model<T>;
  property: any;
  errorMessage?: string;
}

export const isUnique = <T extends Document>(options: IOptions<T>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultMessage = 'Αυτή η τιμή χρησιμοποιείται ήδη.';
  const { collection, property, errorMessage = defaultMessage } = options;
  const result = await collection.find({ property });

  if (result) return res.status(400).send(errorMessage);

  next();
};
