import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

export const employerExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { employerId } = req.body;
  const employer = await getRepository('Employer').findOne({ employerId });
  if (!employer) return res.status(404).send('Employer does not exist');
  req.body.employer = employer;
  next();
};
