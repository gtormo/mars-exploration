// Types
import { IDb } from '../src/types/db.type';

export interface Environment {
  api: {
    isEnabled: boolean;
    port: number;
  };
  jwt: {
    secret: string;
  };
  db: IDb;
  crypto: {
    algorithm: string;
    secret: string;
    bytes: number;
  };
}
