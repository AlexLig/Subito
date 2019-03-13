import { getRepository } from 'typeorm';
import { Employee } from './entity';
import { EmployeeDto } from './dto';
import { findEmployerById } from '../employer/service';

const employeeRepo = getRepository(Employee);

export async function createEmployee(dto: EmployeeDto) {
  try {
    // Get employer
    const employer = await findEmployerById(dto.employerId);
    // Combine data to form the employee object.
    const employee = { ...dto, employer };
    // Save to db.
    return await employeeRepo.save(employee);
  } catch (error) {
    throw error;
  }
}

export async function findAllEmployees() {
  try {
    return await employeeRepo.find();
  } catch (error) {
    throw error;
  }
}

export async function findEmployee(id: string) {
  try {
    const employee = await employeeRepo.findOne(id);
    if (!employee) throw new Error();
    return employee;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployee(id: string, dto: EmployeeDto) {
  try {
    // Find employee to update with the given id.
    const employeeToUpdate = await findEmployee(id);
    // Find employer.
    const employer = await findEmployerById(dto.employerId);
    // Combine data to form the updated employee object.
    const newEmployee = { ...employeeToUpdate, ...dto, employer };
    // Save to db.
    return await employeeRepo.save(newEmployee);
  } catch (error) {
    throw error;
  }
}

export async function deleteEmployee(id: string) {
  try {
    const employeeToDelete = await employeeRepo.findOne(id);
    if (!employeeToDelete) throw new Error();
    return await employeeRepo.remove(employeeToDelete);
  } catch (error) {
    throw error;
  }
}
