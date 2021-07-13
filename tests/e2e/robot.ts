// Modules
import supertest, { Test, SuperTest, Response } from 'supertest';
import { Server } from 'http';
import { api } from '../../src/api';

export const robotTestSuite = (): void => {
  const baseUrl = '/robot';

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
      it(`Send 1st robot to planet`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 1,
              y: 1
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(200);
        expect(response.body.position).toMatchObject({
          orientation: 'E',
          position: {
            x: 1,
            y: 1
          },
          lost: false
        });
      });

      it(`Send 2nd robot to planet (case: lost robot)`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'N',
            position: {
              x: 3,
              y: 2
            },
            instructions: 'FRRFLLFFRFLL'
          });
        expect(response.status).toBe(200);
        expect(response.body.position).toMatchObject({
          orientation: 'N',
          position: {
            x: 3,
            y: 3
          },
          lost: true
        });
      });

      it(`Send 3rd robot to planet (case: ignoring x,y of the 2nd lost robot)`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'W',
            position: {
              x: 0,
              y: 3
            },
            instructions: 'LLFFFLFLFL'
          });
        expect(response.status).toBe(200);
        expect(response.body.position).toMatchObject({
          orientation: 'S',
          position: {
            x: 2,
            y: 3
          },
          lost: false
        });
      });
    });

    describe('should fail', (): void => {
      it(`Send robot without access token`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/send`).send();

        expect(response.status).toBe(401);
      });

      it(`Send robot with invalid access token`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: 'xxx-xxx-xxx'
          })
          .send();

        expect(response.status).toBe(401);
      });

      it(`Send robot with empty orientation`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: '',
            position: {
              x: 1,
              y: 1
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot without orientation parameter`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            position: {
              x: 1,
              y: 1
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with multiple orientation values`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'NS',
            position: {
              x: 1,
              y: 1
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with inexistent orientation value`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'A',
            position: {
              x: 1,
              y: 1
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with invalid position`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: -1,
              y: 30
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with invalid position`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 0,
              y: 51
            },
            instructions: 'RFRFRFRF'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with empty instructions`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 5,
              y: 10
            },
            instructions: ''
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot without instructions parameter`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 5,
              y: 10
            }
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with inexistent instruction parameter`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 5,
              y: 10
            },
            instructions: 'X'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with valid & not valid instructions parameter`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 5,
              y: 10
            },
            instructions: 'XRFLFFR'
          });
        expect(response.status).toBe(413);
      });

      it(`Send robot with valid instructions but more than 100`, async (): Promise<void> => {
        const response: Response = await request
          .post(`${baseUrl}/send`)
          .set({
            authorization: process.env.JEST_PLANET_ACCESS_TOKEN
          })
          .send({
            orientation: 'E',
            position: {
              x: 5,
              y: 10
            },
            instructions:
              'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR'
          });
        expect(response.status).toBe(413);
      });
    });
  });
};
