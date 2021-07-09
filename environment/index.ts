// Modules
import { toNumber } from 'lodash';

// Types
import { Environment } from './environment.type';

export const environment: Environment = {
  api: {
    isEnabled: Boolean(process.env.API_IS_ENABLED),
    port: toNumber(process.env.API_PORT)
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
};
