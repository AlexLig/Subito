import { Request, Response } from 'express';
import { Employer } from './entity';
import { findAllEmployers, findEmployerById } from './service';

const employer404 = 'Employer does not exist';
const error500 = 'Internal Server Error';

/** -GET- /employer # Returns all employers. */
export async function findAll(res: Response): Promise<Response> {
  try {
    // Get all employers.
    const employers: Employer[] = await findAllEmployers();

    // If none, send not found.
    if (employers.length < 0) return res.status(404).send('not found');

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

/** -GET- /employer # Returns all employers. */
export async function findById(req: Request, res: Response): Promise<Response> {
  try {
    // Get employer from service.
    const employer = await findEmployerById(
      req.params.id,
      req.query.getRelatedEmployees, // ! Sanitize query string!
    );

    // Return response.
    return res.send(employer);
  } catch (e) {
    // If not found, send 404.
    res.status(500).send('ERROR. HANDLE IT.');
  }
}
