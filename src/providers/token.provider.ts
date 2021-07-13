import { environment } from '../../environment/';

// Modules
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import { isEmpty, isNil, get, isObject } from 'lodash';

// Providers
import { ejectErrorMessage } from './api.provider';

// Types
import { ErrorMessage } from '../types/api.type';
import { TokenPayload } from '../types/token.type';

export const sign = (payload: TokenPayload): Record<string, any> => {
  try {
    if (isEmpty(payload)) {
      ejectErrorMessage({
        status: 413,
        message: 'Missing payload'
      } as ErrorMessage);
    }

    const token: string = jwtSign(payload, environment.jwt.secret, {
      expiresIn: '8h'
    });

    if (isNil(token)) {
      throw new Error('Generated token is nil');
    }

    return { token };
  } catch (error) {
    throw error;
  }
};

export const verify = (token: string): Record<string, any> => {
  try {
    if (isEmpty(token)) {
      ejectErrorMessage({
        status: 413,
        message: 'Token can not be null'
      } as ErrorMessage);
    }

    const payload: any = jwtVerify(token, environment.jwt.secret);

    if (!isObject(payload)) {
      ejectErrorMessage({
        status: 500,
        message: 'Error decoding payload'
      } as ErrorMessage);
    }

    return payload;
  } catch (error) {
    !get(error, "status", null) && ejectErrorMessage({ status: 401, message: "Token has already expired" })
    throw error;
  }
};
