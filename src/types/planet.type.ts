// Types
import { Document, Types } from 'mongoose';
import { IEncrypt } from './crypto.type';

export interface PlanetDimension {
  x: number;
  y: number;
}

export interface Planet extends Document {
  _id: Types.ObjectId;
  name: string;
  password: IEncrypt;
  dimension: PlanetDimension;
}

export interface CreatePlanet {
  name: Planet['name'];
  password: string;
  dimension: Planet['dimension'];
}
