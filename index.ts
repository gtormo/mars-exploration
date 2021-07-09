import * as dotenv from 'dotenv';
dotenv.config();

import { environment } from './environment';

// Modules
import { api } from './src/api';

try {
  const { port } = environment.api;

  api.listen(port, (): void => {
    console.info(`Service listening on 0.0.0.0:${port}`);
  });
} catch (error) {
  console.error(error);
}
