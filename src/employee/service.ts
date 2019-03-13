import { getRepository } from 'typeorm';
import { Employee } from './entity';
import { EmployeeDto } from './dto';
import { Employer } from '../employer/entity';

const employerRepo = getRepository(Employer);
const employeeRepo = getRepository(Employee);

export async function createEmployee(dto: EmployeeDto) {
  try {
    // Get employer
    // const employer = await findEmployer(dto.employerId);
    // Combine dto with employer
    // const employee = { ...dto, employer };
    // save to db
    // return await employeeRepo.save(employee);
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
    const employeeToUpdate = await findEmployee(id);
    // const employer = await findEmployer(dto.employerId);
    // const newEmployer = { ...employeeToUpdate, ...dto, employer };
    // return await employeeRepo.save(newEmployer);
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
