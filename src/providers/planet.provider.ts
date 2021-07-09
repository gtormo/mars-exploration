import { get, toLower } from 'lodash';

// Providers
import { isValidName, isValidPassword } from '../providers/util.provider';
import { encrypt } from '../providers/crypto.provider';

// Types
import { Request } from 'express';
import { CreatePlanet } from '../types/planet.type';
import { ErrorMessage } from '../types/api.type';

const getSanetizedRequestBody = ({
  name,
  password,
  longitude,
  latitude
}: CreatePlanet): CreatePlanet => {
  const _name = toLower(name);

  if (!isValidName(_name)) {
    throw {
      status: 413,
      message: 'Missing or invalid name parameter'
    } as ErrorMessage;
  }

  if (!isValidPassword(password)) {
    throw {
      status: 413,
      message: 'Missing or invalid password parameter'
    } as ErrorMessage;
  }

  return {
    name: _name,
    password,
    latitude,
    longitude
  } as CreatePlanet;
};

export const create = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    const { name, password, latitude, longitude }: CreatePlanet = getSanetizedRequestBody(body);
    const encryptedPassword = encrypt(password);

    return {};
  } catch (error) {
    throw error;
  }
};
