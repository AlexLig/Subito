import express from 'express';
// import {Router} from 'express'
import {
  allEmployees,
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from './handlers';

const router = express.Router();
// TODO: implement route handlers.
router
  .route('/')
  .get(allEmployees)
  .post(createEmployee);
router
  .route('/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);
