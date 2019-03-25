import { getRepository } from 'typeorm';
import { Employer } from './entity';
import { EmployerDto } from './dto';
import { HttpError } from '../utils/HttpError';

const getEmployerRepo = () => getRepository(Employer);

/** Returns an array of all the Employers. */
export async function findAllEmployers(): Promise<Employer[]> {
  // Get all employers.
  const employers: Employer[] = await getEmployerRepo().find();

  // If none, send not found.
  if (employers.length < 0) throw new HttpError(404, 'Employers Not found');

  return employers;
}

/**
 * Returns an Employer by its ID. If getRelatedEmployees is true,
 * adds Employee[] property as employer.employees property.
 */
export async function findEmployerById(
  id: string,
  getRelatedEmployees = false,
): Promise<Employer> {
  // If not getRelated, find Employer.
  let employer: Employer;
  if (!getRelatedEmployees) employer = await getEmployerRepo().findOne(id);

  // If getRelated, find Employer with relations 'employees'.
  if (getRelatedEmployees) {
    employer = await getEmployerRepo().findOne(id, { relations: ['employees'] });
  }

  // If not found, throw 404.
  if (!employer) throw new HttpError(404, 'Employer Not found');

  // Return Employer.
  return employer;
}

/** Saves an Employer to the db and returns it. */
export async function createEmployer(dto: EmployerDto): Promise<Employer> {
  const duplicate = await getEmployerRepo().findOne({ vat: dto.vat });
  if (duplicate) throw new HttpError(409, 'Dublicate vat.');

  return await getEmployerRepo().save(dto);
}

/**
 * Finds and updates an Employer.
 * If the inserted vat is a duplicate (exists on another Employer), throw Error.
 */
export async function updateEmployer(
  id: string,
  dto: Partial<EmployerDto>,
): Promise<Employer> {
  // If vat is duplicate, throw error.
  if (dto.vat) {
    const duplicate = await getEmployerRepo().findOne({ vat: dto.vat });
    if (duplicate && duplicate.id.toString() !== id) {
      throw new HttpError(409, 'Dublicate vat.');
    }
  }

  // Find Employer to update.
  const employerToUpdate = await findEmployerById(id);

  // Merge Employer with dto.
  const updated = { ...employerToUpdate, ...dto };

  // Save to repository.
  return await getEmployerRepo().save(updated);
}

/** Removes an Employer from the db by its ID, and returns the deleted Employer. */
export async function deleteEmployer(id: string): Promise<Employer> {
  const employer = await findEmployerById(id);
  return await getEmployerRepo().remove(employer);
}
