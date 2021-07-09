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
  },
  db: {
    db: process.env.MONGO_CONNECTION_DATABASE,
    host: process.env.MONGO_CONNECTION_HOST,
    username: process.env.MONGO_CONNECTION_USERNAME,
    password: process.env.MONGO_CONNECTION_PASSWORD,
    port: toNumber(process.env.MONGO_CONNECTION_PORT)
  },
  crypto: {
    algorithm: process.env.CRYPTO_ALGORITHM,
    secret: process.env.CRYPTO_SECRET_KEY,
    bytes: toNumber(process.env.CRYPTO_BYTES)
  }
};
