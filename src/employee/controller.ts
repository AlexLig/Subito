import express from 'express';
import { isUnique } from '../middlewares/isUnique';
// import {Router} from 'express'
import {
  allEmployees,
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from './handlers';
import { Employee } from './model';

const uniqueVatMW = isUnique({ collection: Employee, property: 'vat' });
export const router = express.Router();
// TODO: implement route handlers.
router
  .route('/')
  .get(allEmployees)
  .post(createEmployee);
router
  .route('/:id')
  .get(getEmployee)
  .put(uniqueVatMW, updateEmployee)
  .delete(deleteEmployee);
