import express from 'express';
// import {Router} from 'express'
import { allEmployees } from './handlers';

const router = express.Router();
// TODO: implement route handlers.
router
  .route('/')
  .get(allEmployees)
  .post();
router
  .route('/:id')
  .get()
  .put()
  .delete();
