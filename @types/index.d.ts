import { DecodedTokenPayload } from '../src/types/token.type';

declare global {
  namespace Express {
    interface Request {
      decodedTokenPayload: DecodedTokenPayload;
    }
  }
}
