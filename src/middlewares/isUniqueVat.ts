import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

// export const isUnique = <T extends Document>(options: IOptions<T>) => async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const defaultMessage = 'Αυτή η τιμή χρησιμοποιείται ήδη.';
//   const { collection: collection, property, errorMessage = defaultMessage } = options;
//   const result = await collection.find({ [property]: req.body[property] });

//   if (result[0] && result[0].id !== req.params.id) {
//     return res.status(400).send(errorMessage);
//   }

//   next();
// };

export const isUniqueVat = (entity: string) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { vat } = req.body;
  const duplicate = getRepository(entity).findOne({ vat });
  if (duplicate) {
    return res.status(400).send('Ο αφμ υπαρχει');
  }

  next();
};
