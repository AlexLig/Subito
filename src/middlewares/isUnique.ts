import { NextFunction, Request, Response } from 'express';
import { Document, Model } from 'mongoose';

interface IOptions<T extends Document> {
  collection: Model<T>;
  property: string;
  errorMessage?: string;
}

export const isUnique = <T extends Document>(options: IOptions<T>) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultMessage = 'Αυτή η τιμή χρησιμοποιείται ήδη.';
  const { collection: collection, property, errorMessage = defaultMessage } = options;
  const result = await collection.find({ [property]: req.body[property] });

  if (result[0] && result[0].id !== req.params.id) {
    return res.status(400).send(errorMessage);
  }

  next();
};
