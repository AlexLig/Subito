import { getRepository } from 'typeorm';
import { Employer } from './entity';
import { EmployerDto } from './dto';

export async function getEmployerById(id: string): Promise<Employer> {
  const employer = await getRepository(Employer).findOne(id);
  return employer;
}

/** Returns an array of all the Employers. */
export async function findAllEmployers(): Promise<Employer[]> {
  // Get all employers.
  const employers: Employer[] = await getRepository(Employer).find();

  // If none, send not found.
  if (employers.length < 0) throw new Error('not found');

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
}

/** Saves an Employer to the db and returns it. */
export async function createEmployer(dto: EmployerDto): Promise<Employer> {
  const duplicate = await getRepository(Employer).findOne({ vat: dto.vat });
  if (duplicate) throw new Error('DUPLICATE');

  return await getRepository(Employer).save(dto);
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
    const duplicate = await getRepository(Employer).findOne({ vat: dto.vat });
    if (duplicate && duplicate.id.toString() !== id) throw new Error('DUPLICATE');
  }

  // Find Employer to update.
  const employerToUpdate = await findEmployerById(id);

  // Merge Employer with dto.
  const updated = { ...employerToUpdate, ...dto };

  // Save to repository.
  return await getRepository(Employer).save(updated);
}

/** Removes an Employer from the db by its ID, and returns the deleted Employer. */
export async function deleteEmployer(id: string): Promise<Employer> {
  const employer = await findEmployerById(id);
  return await getRepository(Employer).remove(employer);
}
