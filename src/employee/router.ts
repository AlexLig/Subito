import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import {
  findAllEmployees,
  createEmployee,
  findEmployee,
  updateEmployee,
  deleteEmployee,
} from './service';
import { Employee } from './entity';
import { validateReq } from '../middlewares/validateReq';
import { EmployeeDto } from './dto';
import { isUniqueVat } from '../middlewares/isUniqueVat';

export const router = express.Router();
router
  .route('/')

  /** Get all employees */
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await findAllEmployees();
      return res.send(employees);
    } catch (e) {
      next(e);
    }
  })
  /** Save an employee to the db. */
  .post(
    validateReq(EmployeeDto),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const employee = await createEmployee(req.body);
        return res.send(employee);
      } catch (e) {
        next(e);
      }
    },
  );
router
  .route('/:id')
  /** Get employee by id */
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await findEmployee(req.params.id);
      return res.send(employee);
    } catch (e) {
      next(e);
    }
  })
  /** Update an employer by its id. */
  .put(
    validateReq(EmployeeDto),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const employee = await updateEmployee(req.params.id, req.body);
        return res.send(employee);
      } catch (e) {
        next(e);
      }
    },
  )
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: Employee = await deleteEmployee(req.params.id);
      return res.send(employee);
    } catch (e) {
      next(e);
    }
  });
