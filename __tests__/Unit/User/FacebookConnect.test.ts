import { request } from 'graphql-request';
import config from '../../../src/config';
import databaseConn, { closeDatabaseConn } from '../../../src/databaseConn';

beforeAll(async () => {
  await databaseConn();
});

afterAll(async () => {
  await closeDatabaseConn();
});

const TEST = 'FacebookConnect';

describe('Facebook', () => {
  it('Facebook / sign up', async () => {
    const facebookConnectMutation = `
      mutation {
        ${TEST}(
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
      `http://127.0.0.1:4000${config.GRAPHQL.GRAPHQL_ENDPOINT}`,
      facebookConnectMutation
    );
    expect(facebookConnectResponse).toBeDefined();
    expect(facebookConnectResponse[TEST].token).toBeDefined();
    // expect(facebookConnectResponse[TEST].token).not.toBeNull();
  });
});
