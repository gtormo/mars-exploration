// Types
import { Document, Types } from 'mongoose';
import { PlanetDimension } from './planet.type';

export interface RobotSent {
  orientation: string;
  position: PlanetDimension;
  instructions: string;
}

export interface RobotSet {
  orientation: RobotSent['orientation'];
  position: RobotSent['position'];
  lost?: boolean;
}

export interface RobotLost extends Document {
  _id: Types.ObjectId;
  orientation: string;
  position: PlanetDimension;
}
