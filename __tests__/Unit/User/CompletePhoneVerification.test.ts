import { request } from 'graphql-request';
import config from '../../../src/config';
import databaseConn, { closeDatabaseConn } from '../../../src/databaseConn';

beforeAll(async () => {
  await databaseConn();
});

afterAll(async () => {
  await closeDatabaseConn();
});

const TEST = 'CompletePhoneVerification';

describe(TEST, () => {
  it('Phone / verification', async () => {
    const CompletePhoneVerificationMutation = `
      mutation {
        ${TEST}(
          phoneNumber: "16479208877",
          key: "7500"
        ) {
            ok
            token
            error

        }
      }
    `;

    const CompletePhoneVerificationResponse = await request(
      `http://127.0.0.1:4000${config.GRAPHQL_ENDPOINT}`,
      CompletePhoneVerificationMutation
    );
    expect(CompletePhoneVerificationResponse).toEqual({
      [TEST]: {
        error: 'Verification key is not valid',
        ok: false,
        token: null,
      },
    });
  });
});
