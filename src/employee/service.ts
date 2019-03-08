import { getRepository } from 'typeorm';
import { Employee } from './entity';

export async function createEmployee(employee: Employee) {
  employeeRepo().save(employee);
}

function employeeRepo() {
  return getRepository(Employee);
}
