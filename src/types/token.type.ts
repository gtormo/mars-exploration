// Types
import { Types } from 'mongoose';
import { PlanetDimension } from './planet.type';

export interface Token {
  expireHours: string;
  payload: Record<string, any>;
}

export interface TokenPayload {
  _id: Types.ObjectId;
  name: string;
  dimension: PlanetDimension;
}

export interface DecodedTokenPayload {
  _id: TokenPayload['_id'];
  name: TokenPayload['name'];
  dimension: TokenPayload['dimension'];
  iat: number;
  exp: number;
}
