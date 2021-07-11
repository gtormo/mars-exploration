// Modules
import { isEmpty, isNil, inRange } from 'lodash';

// Types
import { PlanetDimension } from '../types/planet.type';

export const isValidName = (value: string): boolean => {
  return isEmpty(value) || isNil(value) ? false : true;
};

export const isValidPassword = (value: string): boolean => {
  return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value);
};

export const isValidDimension = (dimension: PlanetDimension): boolean => {
  const { x, y } = dimension;
  return inRange(x, 0, 51) && inRange(y, 0, 51) ? true : false;
};
