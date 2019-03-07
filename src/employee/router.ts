import express from 'express';
import { isUniqueVat } from '../middlewares/isUniqueVat';
import { findAll, create} from './controllers';
import { employerExists } from '../middlewares/employerExists';

const uniqueVatEmployee = isUniqueVat('Employee');
export const router = express.Router();
router
  .route('/')
  .get(findAll)
  .post(create);
// router
//   .route('/:id')
//   .get(findById)
//   .put(uniqueVatEmployee, updateOne)
//   .delete(deleteOne);
