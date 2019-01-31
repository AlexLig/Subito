import { Request, Response } from 'express';
import Employee from './model';

// - POST - /employee # creates a new employee.
// - GET - /employees # returns all employees.
export const allEmployees = async (req: Request, res: Response) => {
  const employees = await Employee.find().sort('name');
  res.send(employees);
};

// - GET - /employee/{1} # returns an employee with id 1.
// - PUT - /employee/{1} # updates an employee with id of 1.
// - DELETE - /employee/{1} # deletes an employee with id of 1.
