import { Request, Response } from 'express';
import { Employer } from './entity';
import {
  findAllEmployers,
  findEmployerById,
  createEmployer,
  deleteEmployer,
  updateEmployer,
} from './service';

const employer404 = 'Employer does not exist';
const error500 = 'Internal Server Error';

/** -GET- /employer # Returns all employers. */
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    // Get all employers.
    const employers: Employer[] = await findAllEmployers();

    // Return all employers.
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
}

/**
 * -GET- /employer:id?getRelatedEmployees=true|false.
 */
export async function findById(req: Request, res: Response): Promise<Response> {
  try {
    // Get employer from service.
    const employer: Employer = await findEmployerById(
      req.params.id,
      req.query.getRelatedEmployees, // ! Sanitize query string!
    );

    // Return response.
    return res.send(employer);
  } catch (e) {
    // TODO: If not found, send 404.
    res.status(500).send('ERROR. HANDLE IT.');
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    // Get saved employer from service.
    const employer = await createEmployer(req.body);

    // Return employer.
    return res.send(employer);
  } catch (e) {
    res.status(500).send('ERROR. HANDLE IT.');
  }
}

/** -PUT- /employer/:id */
export async function update(req: Request, res: Response): Promise<Response> {
  try {
    // Get response from service.
    const response = await updateEmployer(req.params.id, req.body);

    // Return response
    return res.send(response);
  } catch (e) {
    res.status(500).send('ERROR. HANDLE IT.');
  }
}

/** -DELETE- /employer/:id */
export async function remove(req: Request, res: Response): Promise<Response> {
  try {
    // Get response from service.
    const response = await deleteEmployer(req.params.id);

    // Return response
    return res.send(response);
  } catch (e) {
    res.status(500).send('ERROR. HANDLE IT.');
  }
}
