// Modules
import supertest, { Test, SuperTest, Response } from 'supertest';
import { Server } from 'http';
import { api } from '../../src/api';

export const sampleTestSuite = (): void => {
  const baseUrl = '/404';

  describe(baseUrl, (): void => {
    let request: SuperTest<Test>;
    let server: Server;

    beforeAll((): void => {
      server = api.listen(8080);
      request = supertest(api);
    });

    afterAll((): void => {
      server.close();
    });

    describe('should not fail', (): void => {
      it(`Sample test 1+1=2`, async (): Promise<void> => {
        const sum: number = 1 + 1;
        expect(sum).toBe(2);
      });
    });

    describe('should fail', (): void => {
      it(`POST ${baseUrl}/signup an existent user with same email`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send();
        expect(response.status).toBe(404);
      });
    });
  });
};
