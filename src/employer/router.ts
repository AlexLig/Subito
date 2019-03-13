import express from 'express';
import { findAll, findById } from './controllers';

export const router = express.Router();
router.route('/').get(findAll);

router.route('/:id').get(findById);
