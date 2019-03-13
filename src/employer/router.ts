import express from 'express';
import { findAll, findById, create, update, remove } from './controllers';

export const router = express.Router();
router
  .route('/')
  .get(findAll)
  .post(create);

router
  .route('/:id')
  .get(findById)
  .put(update)
  .delete(remove);
