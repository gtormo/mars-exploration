import { get, isEmpty, isNil, toLower } from 'lodash';

// Providers
import { ejectErrorMessage } from './api.provider';
import { isValidName, isValidPassword, isValidDimension } from './util.provider';
import { decrypt, encrypt } from './crypto.provider';
import { sign } from './token.provider';

// Schemas
import { PlanetSchema } from '../schemas/planet.schema';

// Types
import { Request } from 'express';
import { CreatePlanet, Planet } from '../types/planet.type';
import { ErrorMessage } from '../types/api.type';
import { IEncrypt } from '../types/crypto.type';
import { TokenPayload } from '../types/token.type';

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

    const hasAlreadyCreated: boolean = await PlanetSchema.exists({ name });
    hasAlreadyCreated &&
      ejectErrorMessage({
        status: 409,
        message: `Planet ${name} has already exists`
      } as ErrorMessage);

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

export const access = async (request: Request): Promise<Record<string, any>> => {
  try {
    const { name, password }: CreatePlanet = get(request, 'body', {
      name: '',
      password: ''
    });

    if (isEmpty(name) || isEmpty(password)) {
      ejectErrorMessage({
        status: 413,
        message: 'Missing login credentials'
      } as ErrorMessage);
    }

    const planet: Planet = await PlanetSchema.findOne({ name: toLower(name) });

    if (isEmpty(planet)) {
      ejectErrorMessage({
        status: 401,
        message: 'Invalid login credentials'
      } as ErrorMessage);
    }

    const dbPassword: IEncrypt = get(planet, 'password', null);
    const decryptedPassword: string = decrypt(dbPassword);

    if (isNil(dbPassword) || decryptedPassword !== password) {
      ejectErrorMessage({
        status: 401,
        message: 'Invalid login credentials'
      } as ErrorMessage);
    }

    const token = sign({
      _id: planet._id,
      name: planet.name,
      dimension: planet.dimension
    } as TokenPayload);

    return token;
  } catch (error) {
    throw error;
  }
};
