import { getRepository } from 'typeorm';
import { Employer } from './entity';

export async function getEmployerById(id: string): Promise<Employer> {
  const employer = await getRepository(Employer).findOne(id);
  return employer;
}
