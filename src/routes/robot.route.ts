// Providers
import { getResponseErrorMessage } from '../providers/api.provider';
import { send } from '../providers/robot.provider';

// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.post('/send', async (request: Request, response: Response) => {
  try {
    const message = await send(request);
    response.status(200).send(message);
  } catch (error) {
    const { status, message } = getResponseErrorMessage(error);
    response.status(status).send({ message });
  }
});
