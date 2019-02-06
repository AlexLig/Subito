import { Request, Response } from 'express';
import { Employee } from './entity';
// import { validate } from './validation';

const employeeByIdNotFoundMessage = 'Employee with the given Id was not found';

/** - POST - /employee # creates a new employee. */
export const create = async (req: Request, res: Response) => {
  // const { employerId, vat } = employeeDto;

  //   const duplicate = await this.repository.findOne({ vat });
  //   if (duplicate) {
  //     throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);
  //   }
    const { body } = req;
    const employer = await this.employerService.findById(body.employerId);
    const employeeToCreate = { ...body, employer };

    try {
      return await this.repository.save(employeeToCreate);
    } catch (e) {
      throw res.status(500).send('internal server error');
    }
  }
};

/** - GET - /employees # returns all employees. */
export const findAll = async (req: Request, res: Response) => {
  const employees = await Employee.find().sort('name');
  res.send(employees);
};

/** - GET - /employee/{id} # returns an employee with given Id. */
export const findOne = async (req: Request, res: Response) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
  res.send(employee);
};

/** - PUT - /employee/{id} # updates an employee by Id. */
export const updateOne = async (req: Request, res: Response) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);
  const employee = await Employee.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
  res.send(employee);
};

/** - DELETE - /employee/{id} # deletes an employee by Id. */
export const deleteOne = async (req: Request, res: Response) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);
  if (!employee) return res.status(404).send(employeeByIdNotFoundMessage);
  res.send(employee);
};
