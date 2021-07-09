// Providers
import { getResponseErrorMessage } from '../providers/api.provider';
import { create } from '../providers/planet.provider';

// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.post('/', async (request: Request, response: Response) => {
  try {
    const message = await create(request);
    response.status(200).send(message);
  } catch (error) {
    const { status, message } = getResponseErrorMessage(error);
    response.status(status).send({ message });
  }
});
