// Modules
import { get, toUpper } from 'lodash';

// Providers
import { ejectErrorMessage } from './api.provider';
import { isValidDimension, isValidOrientation, isValidInstruction } from './util.provider';

// Schemas
import { LostRobotsSchema } from '../schemas/lostRobots.schema';

// Types
import { Request } from 'express';
import { RobotSent, RobotSet } from '../types/robot.type';
import { ErrorMessage } from '../types/api.type';
import { PlanetDimension } from '../types/planet.type';
import { DecodedTokenPayload } from '../types/token.type';

const getSanetizedRequestBody = ({
  orientation = '',
  position,
  instructions = ''
}: RobotSent): RobotSent => {
  const _orientation: string = toUpper(orientation);
  const _instructions: string = toUpper(instructions);

  if (!isValidOrientation(_orientation)) {
    ejectErrorMessage({
      status: 413,
      message: 'Missing or invalid orientation. Orientation must be N,S,E or W'
    } as ErrorMessage);
  }

  if (!isValidDimension(position)) {
    ejectErrorMessage({
      status: 413,
      message: 'Missing or invalid coordinates. Coordinates must be between 0,50'
    } as ErrorMessage);
  }

  if (!isValidInstruction(_instructions)) {
    ejectErrorMessage({
      status: 413,
      message: 'Missing or invalid instructions. Max allowed instructions: 99'
    } as ErrorMessage);
  }

  return {
    orientation: _orientation,
    position,
    instructions: _instructions
  } as RobotSent;
};

const isPositionOffSetPlanet = (
  planetDimesions: PlanetDimension,
  robotCoordinates: RobotSent['position']
): boolean => {
  return robotCoordinates.x > planetDimesions.x || robotCoordinates.y > planetDimesions.y;
};

const existsRobotScence = async (
  position: PlanetDimension,
  orientation: string
): Promise<boolean> => {
  try {
    return await LostRobotsSchema.exists({
      'position.x': position.x,
      'position.y': position.y,
      orientation
    });
  } catch (error) {
    throw error;
  }
};

const move = async (
  instruction: string,
  currentPosition: RobotSet,
  planetDimension: PlanetDimension
): Promise<RobotSet> => {
  try {
    const { orientation, position } = currentPosition;
    let lost: boolean = currentPosition.lost;
    let _orientation: string = orientation;

    const isScence = await existsRobotScence(position, _orientation);

    if (instruction === 'F') {
      const directionForwardRules = {
        N: { x: position.x, y: position.y + 1 },
        E: { x: position.x + 1, y: position.y },
        W: { x: position.x - 1, y: position.y },
        S: { x: position.x, y: position.y - 1 }
      };

      let previousPosition = currentPosition.position;
      currentPosition.position = directionForwardRules[orientation];

      if (isPositionOffSetPlanet(planetDimension, currentPosition.position)) {
        if (!isScence) {
          currentPosition.position = previousPosition;
          lost = true;

          const newLostRobot = new LostRobotsSchema();
          newLostRobot.position = previousPosition;
          newLostRobot.orientation = orientation;

          await newLostRobot.save();
        } else {
          currentPosition.position = previousPosition;
        }
      }
    } else {
      const allowedTurns = {
        R: { N: 'E', E: 'S', S: 'W', W: 'N' },
        L: { N: 'W', W: 'S', S: 'E', E: 'N' }
      };

      _orientation = allowedTurns[instruction][orientation];
    }

    return {
      orientation: _orientation,
      position: currentPosition.position,
      lost
    } as RobotSet;
  } catch (error) {
    throw error;
  }
};

export const send = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    const { dimension }: DecodedTokenPayload = get(request, 'decodedTokenPayload', null);

    const { orientation, position, instructions }: RobotSent = getSanetizedRequestBody(body);
    const _instructions: string[] = instructions.split('');
    let currentPosition: RobotSet = { orientation, position, lost: false };

    for (let i = 0; i < _instructions.length; i++) {
      const instruction: string = _instructions[i];

      if (!currentPosition.lost) {
        currentPosition = await move(instruction, currentPosition, dimension);
      }
    }

    return { position: currentPosition };
  } catch (error) {
    throw error;
  }
};
