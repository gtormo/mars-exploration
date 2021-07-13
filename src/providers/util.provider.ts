// Modules
import { isEmpty, isNil, inRange } from 'lodash';

// Types
import { PlanetDimension } from '../types/planet.type';

export enum Instruction {
  R = 'RIGHT',
  L = 'LEFT',
  F = 'FORWARD'
}

export enum Orientation {
  N = 'NORTH',
  S = 'SOUTH',
  E = 'EAST',
  W = 'WEST'
}

export const isValidName = (value: string): boolean => {
  return isEmpty(value) || isNil(value) ? false : true;
};

export const isValidPassword = (value: string): boolean => {
  return new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value);
};

export const isValidDimension = (dimension: PlanetDimension): boolean => {
  const { x, y } = dimension;
  return inRange(x, 0, 51) && inRange(y, 0, 51);
};

export const isValidOrientation = (orientation: string): boolean => {
  if (isEmpty(orientation) || isNil(orientation)) {
    return false;
  }

  return isNil(Orientation[orientation]) ? false : true;
};

export const isValidInstruction = (instruction: string): boolean => {
  if (isEmpty(instruction) || isNil(instruction)) {
    return false;
  } else if (instruction.length > 99) {
    return false;
  }

  const charInstructions: string[] = instruction.split('');
  for (let i = 0; i < charInstructions.length; i++) {
    const charInstructtion = charInstructions[i];

    if (isNil(Instruction[charInstructtion])) {
      return false;
      break;
    }
  }

  return true;
};
