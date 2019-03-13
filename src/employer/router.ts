import express, { Request, Response } from 'express';
import { Employer } from './entity';
import {
  findAllEmployers,
  createEmployer,
  findEmployerById,
  updateEmployer,
  deleteEmployer,
} from './service';

const employer404 = 'Employer does not exist';
const error500 = 'Internal Server Error';

export const router = express.Router();

/** /api/employer */
router
  .route('/')

  /** Get all employers. */
  .get(
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const employers: Employer[] = await findAllEmployers();
        return res.send(employers);
      } catch (error) {
        switch (error.message) {
          case '500':
            res.status(500).send(error500);
          case '404':
            res.status(404).send(employer404);
          default:
            res.status(500).send(error500);
        }
      }
    },
  )

  /** Save an employer to the db. */
  .post(
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const employer: Employer = await createEmployer(req.body);
        return res.send(employer);
      } catch (e) {
        res.status(500).send('ERROR. HANDLE IT.');
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
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const employer: Employer = await findEmployerById(
          req.params.id,
          req.query.getRelatedEmployees, // ! Sanitize query string!
        );
        return res.send(employer);
      } catch (e) {
        res.status(500).send('ERROR. HANDLE IT.');
      }
    },
  )

  /** Update an employer by its ID. */
  .put(
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const employer: Employer = await updateEmployer(req.params.id, req.body);
        return res.send(employer);
      } catch (e) {
        res.status(500).send('ERROR. HANDLE IT.');
      }
    },
  )

  /** Remove an employer from the db. */
  .delete(
    async (req: Request, res: Response): Promise<Response> => {
      try {
        const employer: Employer = await deleteEmployer(req.params.id);
        return res.send(employer);
      } catch (e) {
        res.status(500).send('ERROR. HANDLE IT.');
      }
    },
  );
