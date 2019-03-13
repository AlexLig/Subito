import { getRepository } from 'typeorm';
import { Employer } from './entity';

export async function getEmployerById(id: string): Promise<Employer> {
  const employer = await getRepository(Employer).findOne(id);
  return employer;
}

/** Returns an array of all the Employers. */
export async function findAllEmployers(): Promise<Employer[]> {
  try {
    return await getRepository(Employer).find();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function findEmployerById(
  id: string,
  getRelatedEmployees = false,
): Promise<Employer> {
  try {
    const repository = getRepository(Employer);

    // If not getRelated, find Employer.
    let employer: Employer;
    if (!getRelatedEmployees) employer = await repository.findOne(id);

    // If getRelated, find Employer with relations 'employees'.
    if (getRelatedEmployees) {
      employer = await repository.findOne(id, { relations: ['employees'] });
    }

    // If not found, throw 404.
    if (!employer) throw new Error('not found');

    // Return Employer.
    return employer;
  } catch (error) {
    throw new Error(error.message);
  }
}
