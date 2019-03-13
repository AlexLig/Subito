import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createEmployee, findAllEmployees, findEmployee } from './service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { EmployeeDto } from './dto';

const employer404 = 'Employer does not exist';
const error500 = 'Internal Server Error';

/** - POST - /employee # creates a new employee. */
export const create = async (req: Request, res: Response) => {
  // Validate req.body with createEmployeeDto
  const dto = plainToClass(EmployeeDto, req.body as object);
  // { whitelist: true } has side effect
  const errors = await validate(dto, { whitelist: true });
  if (errors.length > 0) res.status(400).send('bad request');

  try {
    const employee = await createEmployee(dto);
    res.send(employee);
  } catch (error) {
    // TODO: proper error handling, and response messages.
    switch (error) {
      default:
        res.status(500).send(error500);
    }
  }
};

/** - GET - /employees # returns all employees. */
export const findAll = async (req: Request, res: Response) => {
  try {
    const employees = await findAllEmployees();
    res.send(employees);
  } catch (error) {
    switch (error) {
      default:
        res.status(500).send(error500);
    }
  }
};

/** - GET - /employees # returns employee with the given id. */
export const findOne = async (req: Request, res: Response) => {
  try {
    const employee = await findEmployee(req.params.id);
    res.send(employee);
  } catch (error) {
    switch (error) {
      default:
        res.status(500).send(error500);
    }
  }
};
