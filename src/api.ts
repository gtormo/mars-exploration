// Modules
import express, { Express, json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import { router as planetRouter } from './routes/planet.route';
import { router as robotRouter } from './routes/robot.route';

// Middlewares
import { router as authMiddleware } from './middlewares/auth.middleware';

export const api: Express = express();

api.use(cors());
api.use(json());
api.use(morgan('short', { skip: () => process.env.NODE_ENV === 'test' }));

// Public routes
api.use('/planet', planetRouter);

// Protected routes with authentication
api.use(authMiddleware);
api.use('/robot', robotRouter);
