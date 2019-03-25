import express, { Request, Response, NextFunction } from 'express';
import { Employer } from './entity';
import {
  findAllEmployers,
  createEmployer,
  findEmployerById,
  updateEmployer,
  deleteEmployer,
} from './service';
import { validateReq } from '../middlewares/validateReq';
import { EmployerDto } from './dto';

export const router = express.Router();

/** /api/employer */
router
  .route('/')

  /** Get all employers. */
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      try {
        const employers = await findAllEmployers();
        return res.send(employers);
      } catch (e) {
        next(e);
      }
    },
  )

  /** Save an employer to the db. */
  .post(
    validateReq(EmployerDto),
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      try {
        const employer = await createEmployer(req.body);
        return res.send(employer);
      } catch (e) {
        next(e);
      }
    },
  );

/** /api/employer/:id */
router
  .route('/:id')

  /**
   * /employer:id?getRelatedEmployees = true | false
   * Get an employer by id. Query string to also get all related employees.
   */
  .get(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      try {
        const employer = await findEmployerById(
          req.params.id,
          req.query.getRelatedEmployees, // ! Sanitize query string!
        );
        return res.send(employer);
      } catch (e) {
        next(e);
      }
    },
  )

  /** Update an employer by its ID. */
  .put(
    validateReq(EmployerDto, { skipMissingProperties: true }),
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      try {
        const employer = await updateEmployer(req.params.id, req.body);
        return res.send(employer);
      } catch (e) {
        next(e);
      }
    },
  )

  /** Remove an employer from the db. */
  .delete(
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      try {
        const employer: Employer = await deleteEmployer(req.params.id);
        return res.send(employer);
      } catch (e) {
        next(e);
      }
    },
  );
