import { Request, Response } from 'express';
import { Employee } from './entity';
import { getRepository } from 'typeorm';
import { getEmployerById } from '../employer/service';
import { Employer } from '../employer/entity';
import { createEmployee } from './service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { validateEmployee, validateCreateEmployeeDto } from '../utils/validation';
import { CreateEmployeeDto } from './dto';
// import { validate } from './validation';

const employee404 = 'Employee with the given Id was not found';
const employer404 = 'Employer does not exist';
const error500 = 'Internal Server Error';

/** - POST - /employee # creates a new employee. */
export const create = async (req: Request, res: Response) => {
  // Validate req.body with createEmployeeDto
  const dto = plainToClass(CreateEmployeeDto, req.body as object);
  // { whitelist: true } has side effect
  const errors = await validate(dto, { whitelist: true });
  if (errors.length > 0) res.status(400).send('bad request');

  try {
    const employee = await createEmployee(dto);
    res.send(employee);
  } catch (error) {
    // TODO: proper error handling, and response messages.
    switch (error.message) {
      case '500':
        res.status(500).send(error500);
      case '404':
        res.status(404).send(employer404);
      default:
        res.status(500).send(error500);
    }
  }
};

/** - GET - /employees # returns all employees. */
export const findAll = async (req: Request, res: Response) => {
  try {
    const employees = await getRepository('Employee').find();
    if (!employees) return res.status(404).send('not found');
    res.send(employees);
  } catch (error) {
    switch (error.message) {
      case '500':
        res.status(500).send(error500);
      case '404':
        res.status(404).send(employer404);
    }
    res.status(500).send('error500');
  }
};
