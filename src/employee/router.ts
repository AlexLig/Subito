import express from 'express';
import { isUniqueVat } from '../middlewares/isUniqueVat';
import { findAll, create, deleteOne, findOne, updateOne } from './routeHandlers';
import { employerExists } from './employerExists';

const uniqueVatEmployee = isUniqueVat('Employee');
export const router = express.Router();
router
  .route('/')
  .get(findAll)
  .post([employerExists, uniqueVatEmployee], create);
router
  .route('/:id')
  .get(findOne)
  .put(uniqueVatEmployee, updateOne)
  .delete(deleteOne);
