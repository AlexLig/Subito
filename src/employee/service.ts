import { getRepository } from 'typeorm';
import { Employee } from './entity';
import { EmployeeDto } from './dto';
import { findEmployerById } from '../employer/service';
import { HttpError } from '../utils/HttpError';

const getEmployeeRepo = () => getRepository(Employee);

export async function createEmployee(dto: EmployeeDto) {
  // Get employer
  const employer = await findEmployerById(dto.employerId);
  // Combine data to form the employee object.
  const employee = { ...dto, employer };
  // Save to db.
  return await getEmployeeRepo().save(employee);
}

export async function findAllEmployees() {
  const employees: Employee[] = await getEmployeeRepo().find();
  if (employees.length < 0) throw new HttpError(404, 'Employees not found');
  return employees;
}

export async function findEmployee(id: string) {
  const employee = await getEmployeeRepo().findOne(id);
  if (!employee) throw new HttpError(404, 'Employee not found');
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
  return await getEmployeeRepo().save(newEmployee);
}

export async function deleteEmployee(id: string) {
  const employeeToDelete = await findEmployee(id);
  return await getEmployeeRepo().remove(employeeToDelete);
}
