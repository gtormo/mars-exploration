import { get, toLower } from 'lodash';

// Providers
import { ejectErrorMessage } from '../providers/api.provider';
import { isValidName, isValidPassword, isValidDimension } from '../providers/util.provider';
import { encrypt } from '../providers/crypto.provider';

// Schemas
import { PlanetSchema } from '../schemas/planet.schema';

// Types
import { Request } from 'express';
import { CreatePlanet, Planet } from '../types/planet.type';
import { ErrorMessage } from '../types/api.type';

const getSanetizedRequestBody = ({ name, password, dimension }: CreatePlanet): CreatePlanet => {
  const _name = toLower(name);

  if (!isValidName(_name)) {
    ejectErrorMessage({
      status: 413,
      message: 'Missing or invalid name parameter'
    } as ErrorMessage);
  }

  if (!isValidPassword(password)) {
    ejectErrorMessage({
      status: 413,
      message: 'Missing or invalid password parameter'
    } as ErrorMessage);
  }

  if (!isValidDimension(dimension)) {
    ejectErrorMessage({
      status: 413,
      message: 'Missing or invalid dimension. Dimesion must be between 0,50'
    } as ErrorMessage);
  }

  return {
    name: _name,
    password,
    dimension
  } as CreatePlanet;
};

export const create = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    const { name, password, dimension }: CreatePlanet = getSanetizedRequestBody(body);
    const encryptedPassword = encrypt(password);

    const newPlanet: Planet = new PlanetSchema();
    newPlanet.name = name;
    newPlanet.password = encryptedPassword;
    newPlanet.dimension = dimension;

    await newPlanet.save();

    return { message: 'Planet was created successfully' };
  } catch (error) {
    throw error;
  }
};
