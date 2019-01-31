import { Request, Response } from 'express';
import { Employee } from './model';
import { validate } from './validation';

const employeeByIdNotFoundMessage = 'Employee with the given Id was not found';

/** - POST - /employee # creates a new employee. */
export const createEmployee = async (req: Request, res: Response) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);
  const employee = new Employee(body);
  await employee.save();
  res.send(employee);
};

/** - GET - /employees # returns all employees. */
export const allEmployees = async (req: Request, res: Response) => {
  const employees = await Employee.find().sort('name');
  res.send(employees);
};

/** - GET - /employee/{id} # returns an employee with given Id. */
export const getEmployee = async (req: Request, res: Response) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
  res.send(employee);
};

/** - PUT - /employee/{id} # updates an employee by Id. */
export const updateEmployee = async (req: Request, res: Response) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);
  const employee = await Employee.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
  res.send(employee);
};

/** - DELETE - /employee/{id} # deletes an employee by Id. */
export const deleteEmployee = async (req: Request, res: Response) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
  res.send(employee);
};
