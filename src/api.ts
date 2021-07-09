// Modules
import express, { Express, json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Routes
import { router as planetRouter } from './routes/planet.route';

export const api: Express = express();

api.use(cors());
api.use(json());
api.use(morgan('short', { skip: () => process.env.NODE_ENV === 'test' }));

api.use('/planet', planetRouter);