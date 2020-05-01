import { request } from 'graphql-request';
import config from '../../../src/config';
import databaseConn, { closeDatabaseConn } from '../../../src/databaseConn';

beforeAll(async () => {
  await databaseConn();
});

afterAll(async () => {
  await closeDatabaseConn();
});

const TEST = 'EmailSignIn';

describe('Email', () => {
  it('Email / log in with no user', async () => {
    const EmailSignInMutation = `
      mutation {
        ${TEST}(
          email: "test@naver.com",
          password: "test"
        ) {
            ok
            token
            error

        }
      }
    `;

    const emailSignInResponse = await request(
      `http://127.0.0.1:4000${config.GRAPHQL_ENDPOINT}`,
      EmailSignInMutation
    );
    expect(emailSignInResponse).toEqual({
      [TEST]: {
        error: 'No user found with the email',
        ok: false,
        token: null,
      },
    });
  });
});
