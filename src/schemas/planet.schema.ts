// Modules
import mongoose from 'mongoose';

// Types
import { Planet } from '../types/planet.type';

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    password: { type: Object, required: true },
    dimension: { type: Object, required: true }
  },
  { minimize: true, timestamps: true }
);

export const PlanetSchema: mongoose.Model<Planet> = mongoose.model<Planet>('planets', schema);
