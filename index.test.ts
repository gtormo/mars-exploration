import * as dotenv from 'dotenv';
dotenv.config();
import { environment as originalEnvironment } from './environment';

// Mocking environment
import { mocked } from 'ts-jest/utils';

jest.mock('./environment');
const environment = mocked(originalEnvironment, true);
environment.api.isEnabled = false;

// Providers
import { instance, killInstance } from './src/providers/db.provider';
import mongoose from 'mongoose';

// Tests
// import { sampleTestSuite } from './tests/e2e/sample';
import { planetTestSuite } from './tests/e2e/planet';
import { robotTestSuite } from './tests/e2e/robot';

describe('sequentially run tests', () => {
  beforeAll(async (): Promise<void> => {
    await instance(environment.db);
    await mongoose.connection.db.dropCollection('planets');
    await mongoose.connection.db.dropCollection('lostrobots');
  });

  afterAll(async (): Promise<void> => {
    await killInstance();
  });

  // sampleTestSuite();
  planetTestSuite();
  robotTestSuite();
});
