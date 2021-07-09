// Modules
import { isEmpty, isNil } from 'lodash';

export const isValidName = (value: string): boolean => {
  return isEmpty(value) || isNil(value) ? false : true;
};

export const isValidPassword = (value: string): boolean => {
  return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value);
};
