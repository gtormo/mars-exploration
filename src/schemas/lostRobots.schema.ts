// Modules
import mongoose, { Types } from 'mongoose';

// Types
import { RobotLost } from '../types/robot.type';

const schema: mongoose.Schema = new mongoose.Schema(
  {
    position: { type: Object, required: true },
    orientation: { type: String, required: true }
  },
  { minimize: true, timestamps: true }
);

export const LostRobotsSchema: mongoose.Model<RobotLost> = mongoose.model<RobotLost>(
  'lostrobots',
  schema
);
