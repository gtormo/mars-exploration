// Modules
import supertest, { Test, SuperTest, Response } from 'supertest';
import { Server } from 'http';
import { api } from '../../src/api';

// Types
import { CreatePlanet } from '../../src/types/planet.type';

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
          dimension: {
            x: 0,
            y: 50
          }
        } as CreatePlanet);

        expect(response.status).toBe(200);
      });

      it(`Access to created planet`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/access`).send({
          name: 'Mars',
          password: 'Hello123456'
        } as CreatePlanet);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
        );
      });
    });

    describe('should fail', (): void => {
      it(`Create a planet with same name`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: "Mars",
          password: 'HelloWordl123',
          dimension: {
            x: 10,
            y: 10
          }
        } as CreatePlanet);

        expect(response.status).toBe(409);
      });

      it(`Create a planet with same name "lowerCase"`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: "mars",
          password: 'HelloWordl123',
          dimension: {
            x: 10,
            y: 10
          }
        } as CreatePlanet);

        expect(response.status).toBe(409);
      });

      it(`Create a planet without name`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          password: 'HelloWordl123',
          dimension: {
            x: 10,
            y: 10
          }
        } as CreatePlanet);

        expect(response.status).toBe(413);
      });

      it(`Access to created planet missing credentials`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/access`).send({} as CreatePlanet);

        expect(response.status).toBe(413);
      });

      it(`Access to created planet with invalid credentials`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/access`).send({
          name: 'Mars2',
          password: 'Hello'
        } as CreatePlanet);

        expect(response.status).toBe(401);
      });

      it(`Access to inexistent planet`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/access`).send({
          name: 'Earth',
          password: 'Hello123456'
        } as CreatePlanet);

        expect(response.status).toBe(401);
      });

      it(`Create a planet without password`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: 'Mars',
          dimension: {
            x: 20,
            y: 10
          }
        } as CreatePlanet);

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
          dimension: {
            x: 0,
            y: 51
          }
        } as CreatePlanet);

        expect(response.status).toBe(413);
      });

      it(`Create a planet with negative coordinates`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/`).send({
          name: 'Mars',
          password: 'HelloWordl123',
          dimension: {
            x: -10,
            y: -60
          }
        } as CreatePlanet);

        expect(response.status).toBe(413);
      });
    });
  });
};
