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
      } catch (e) {
        /* statusCode:number is a property of 
        HttpError class that extends Error.
        We cannot check for the typeof e,
        because the instance of HttpError is an Error object.*/
        if (e.statusCode) return res.status(e.statusCode).send(e.message);
        else return res.status(500).send(error500);
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
        /* statusCode:number is a property of 
        HttpError class that extends Error.
        We cannot check for the typeof e,
        because the instance of HttpError is an Error object.*/
        if (e.statusCode) return res.status(e.statusCode).send(e.message);
        else return res.status(500).send(error500);
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
        /* statusCode:number is a property of 
        HttpError class that extends Error.
        We cannot check for the typeof e,
        because the instance of HttpError is an Error object.*/
        if (e.statusCode) return res.status(e.statusCode).send(e.message);
        else return res.status(500).send(error500);
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
        /* statusCode:number is a property of 
        HttpError class that extends Error.
        We cannot check for the typeof e,
        because the instance of HttpError is an Error object.*/
        if (e.statusCode) return res.status(e.statusCode).send(e.message);
        else return res.status(500).send(error500);
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
        /* statusCode:number is a property of 
        HttpError class that extends Error.
        We cannot check for the typeof e,
        because the instance of HttpError is an Error object.*/
        if (e.statusCode) return res.status(e.statusCode).send(e.message);
        else return res.status(500).send(error500);
      }
    },
  );
