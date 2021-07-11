// Modules
import { get } from 'lodash';

// Types
import { ErrorMessage } from '../types/api.type';

export const getResponseErrorMessage = (error: ErrorMessage): ErrorMessage => {
  return {
    message: get(error, 'message', ''),
    status: get(error, 'status', 500)
  } as ErrorMessage;
};

export const ejectErrorMessage = ({ status, message }: ErrorMessage): ErrorMessage => {
  throw {
    status,
    message
  } as ErrorMessage;
};
