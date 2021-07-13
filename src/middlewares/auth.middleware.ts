// Modules
import { get, isNil } from 'lodash';

// Providers
import { verify } from '../providers/token.provider';

// Types
import { Router, Request, Response, NextFunction } from 'express';
import { DecodedTokenPayload } from '../types/token.type';

export const router: Router = Router();

/**
 * Verify if the planet access token is valid
 */
router.use((request: Request, response: Response, next: NextFunction) => {
  try {
    const authorization: string = get(request, 'headers.authorization', null);

    if (isNil(authorization)) {
      return response.status(401).send({ error: 'Missing authorization header' });
    }

    const decodedToken = verify(authorization);

    request.decodedTokenPayload = decodedToken as DecodedTokenPayload;
    next();
  } catch (error) {
    throw error;
  }
});
