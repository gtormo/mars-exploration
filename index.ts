import * as dotenv from 'dotenv';
dotenv.config();

import { environment } from './environment';

// Modules
import { api } from './src/api';

// Providers
import { instance } from './src/providers/db.provider';

(async (): Promise<void> => {
  try {
    await instance(environment.db);

    const { port } = environment.api;

    api.listen(port, (): void => {
      console.info(`Service listening on 0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
