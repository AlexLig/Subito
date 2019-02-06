import { Request, Response } from 'express';
import { Employee } from './entity';
import { getRepository } from 'typeorm';
// import { validate } from './validation';

const employeeByIdNotFoundMessage = 'Employee with the given Id was not found';

/** - POST - /employee # creates a new employee. */
export const create = async (req: Request, res: Response) => {
  const {
    body,
    body: { employer },
  } = req;
  const employeeToCreate = { ...body, employer };

  try {
    return await this.repository.save(employeeToCreate);
  } catch (e) {
    return res.status(500).send('internal server error');
  }
};

/** - GET - /employees # returns all employees. */
export const findAll = async (req: Request, res: Response) => {
  try {
    const employees = await getRepository('Employee').find();
    if (!employees) return res.status(404).send('not found');
    res.send(employees);
  } catch (error) {
    res.status(500).send('internal server error');
  }
};

/** - GET - /employee/{id} # returns an employee with given Id. */
export const findById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const employee = await getRepository('Employee').findOne(id);
    if (!employee) return res.status(404).send('not found');
    res.send(employee);
  } catch (error) {
    res.status(500).send('internal server error');
  }
};

/** - PUT - /employee/{id} # updates an employee by Id. */
export const updateOne = async (req: Request, res: Response) => {
  // TODO: make middleware
  const { vat, id } = req.body;
  const duplicate = await this.repository.findOne({ vat });
  if (duplicate && duplicate.id.toString() !== id) {
    return res.status(400).send('bad request');
  }

  const employee = await getRepository('Employee').findOne(id);
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);

  const updated = { ...employee, ...req.body };

  try {
    const result = await getRepository('Employee').save(updated);
    return res.send(result);
  } catch (e) {
    return res.status(500).send('internal server error');
  }
};

/** - DELETE - /employee/{id} # deletes an employee by Id. */
export const deleteOne = async (req: Request, res: Response) => {
  try {
    const employee = await getRepository('Employee').findOne(req.params.id);
    if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
    const deletedEmployee = await getRepository('Employee').remove(employee);
    res.send(deletedEmployee);
  } catch (e) {
    return res.status(500).send('internal server error');
  }
};
