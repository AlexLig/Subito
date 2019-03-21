import { getRepository } from 'typeorm';
import { Employee } from './entity';
import { EmployeeDto } from './dto';
import { findEmployerById } from '../employer/service';

const employeeRepo = getRepository(Employee);

export async function createEmployee(dto: EmployeeDto) {
  // Get employer
  const employer = await findEmployerById(dto.employerId);
  // Combine data to form the employee object.
  const employee = { ...dto, employer };
  // Save to db.
  return await employeeRepo.save(employee);
}

export async function findAllEmployees() {
  return await employeeRepo.find();
}

export async function findEmployee(id: string) {
  const employee = await employeeRepo.findOne(id);
  if (!employee) throw new Error('404');
  return employee;
}

export async function updateEmployee(id: string, dto: EmployeeDto) {
  // Find employee to update with the given id.
  const employeeToUpdate = await findEmployee(id);
  // Find employer.
  const employer = await findEmployerById(dto.employerId);
  // Combine data to form the updated employee object.
  const newEmployee = { ...employeeToUpdate, ...dto, employer };
  // Save to db.
  return await employeeRepo.save(newEmployee);
}

export async function deleteEmployee(id: string) {
  const employeeToDelete = await employeeRepo.findOne(id);
  if (!employeeToDelete) throw new Error('404');
  return await employeeRepo.remove(employeeToDelete);
}
