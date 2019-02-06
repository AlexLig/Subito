import express from 'express';
import { isUnique } from '../middlewares/isUnique';
// import {Router} from 'express'
import { findAll, create, deleteOne, findOne, updateOne } from './routeHandlers';
import { Employee } from './entity';

const uniqueVatMW = isUnique({ collection: Employee, property: 'vat' });
export const router = express.Router();
router
  .route('/')
  .get(findAll)
  .post(uniqueVatMW, create);
router
  .route('/:id')
  .get(findOne)
  .put(uniqueVatMW, updateOne)
  .delete(deleteOne);
