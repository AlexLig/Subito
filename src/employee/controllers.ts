import { Request, Response } from 'express';
import { Employee } from './entity';
import { getRepository } from 'typeorm';
import { getEmployerById } from '../employer/service';
import { Employer } from '../employer/entity';
import { createEmployee } from './service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { validateEmployee, validateCreateEmployeeDto } from '../utils/validation';
// import { validate } from './validation';

const employee404 = 'Employee with the given Id was not found';
const employer404 = 'Employer does not exist';
const error500 = 'Internal Server Error';

/** - POST - /employee # creates a new employee. */
export const create = async (req: Request, res: Response) => {
  try {
    await validateCreateEmployeeDto(req.body);
    const {
      body,
      body: { employerID },
    } = req;

    const employer: Employer = await getEmployerById(employerID);
    if (!employer) throw new Error('404');
    const employeeData = {
      // ...pick(body, ['vat', 'startWork', 'endWork']),
      ...body,
      employer,
    };
    const employeeToCreate = await validateEmployee(employeeData);
    const employee = await createEmployee(employeeToCreate);
    res.send(employee);
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
