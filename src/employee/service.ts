import { getRepository } from 'typeorm';
import { Employee } from './entity';
import { CreateEmployeeDto } from './dto';
import { Employer } from '../employer/entity';

export async function createEmployee(dto: CreateEmployeeDto) {
  const employerRepo = getRepository(Employer);
  const employeeRepo = getRepository(Employee);

  // Get employer
  let employer;
  try {
    employer = await employerRepo.findOne(dto.employerId);
  } catch (e) {
    throw new Error(e.message);
  }

  // Check if exists
  if (!employer) throw new Error('404');

  // Combine dto with employer
  const employee = { ...dto, employer };

  // save to db
  try {
    return await employeeRepo.save(employee);
  } catch (e) {
    throw new Error(e.message);
  }
}
