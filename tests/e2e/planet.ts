// Modules
import supertest, { Test, SuperTest, Response } from 'supertest';
import { Server } from 'http';
import { api } from '../../src/api';

export const planetTestSuite = (): void => {
  const baseUrl = '/planet';

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
      it(`Create a valid planet`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: 'Mars',
          password: 'Hello123456',
          latitude: 20,
          longitude: 30
        });

        expect(response.status).toBe(200);
      });
    });

    describe('should fail', (): void => {
      it(`Create a planet without name`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          password: 'HelloWordl123',
          latitude: 20,
          longitude: 30
        });

        expect(response.status).toBe(413);
      });

      it(`Create a planet without password`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: 'Mars',
          latitude: 20,
          longitude: 30
        });

        expect(response.status).toBe(413);
      });

      it(`Create a planet without any property`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({});

        expect(response.status).toBe(413);
      });

      it(`Create a planet with invalid coordinates`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: 'Mars',
          password: 'HelloWordl123',
          latitude: -20,
          longitude: -30
        });

        expect(response.status).toBe(413);
      });

      it(`Create a planet with invalid coordinates`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: 'Mars',
          password: 'HelloWordl123',
          latitude: 51,
          longitude: 60
        });

        expect(response.status).toBe(413);
      });
    });
  });
};
