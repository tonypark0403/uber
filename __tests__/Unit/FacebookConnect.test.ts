import { request } from 'graphql-request';
import config from '../../src/config';
import databaseConn, { closeDatabaseConn } from '../../src/databaseConn';

beforeAll(async () => {
  await databaseConn();
});

afterAll(async () => {
  await closeDatabaseConn();
});

describe('Facebook', () => {
  it('Facebook / sign up', async () => {
    const facebookConnectMutation = `
      mutation {
        FacebookConnect(
          firstName: "Tony",
          lastName: "Park",
          fbId: "262503123862234",
          email: "c3dream@naver.com"
        ) {
            ok
            token
            error

        }
      }
    `;

    const facebookConnectResponse = await request(
      `http://127.0.0.1:4000${config.GRAPHQL_ENDPOINT}`,
      facebookConnectMutation
    );
    expect(facebookConnectResponse).toEqual({
      FacebookConnect: {
        error: null,
        ok: true,
        token: 'temporary new user',
      },
    });
  });
});
