import { environment as originalEnvironment } from './environment';

// Mocking environment
import { mocked } from 'ts-jest/utils';

jest.mock('./environment');
const environment = mocked(originalEnvironment, true);
environment.api.isEnabled = false;

// Tests
import { sampleTestSuite } from './tests/e2e/sample';

describe('sequentially run tests', () => {
  beforeAll(async (): Promise<void> => {});

  afterAll(async (): Promise<void> => {});

  sampleTestSuite();
});
