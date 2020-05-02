import { request } from 'graphql-request';
import config from '../../../src/config';
import databaseConn, { closeDatabaseConn } from '../../../src/databaseConn';

beforeAll(async () => {
  await databaseConn();
});

afterAll(async () => {
  await closeDatabaseConn();
});

const TEST = 'EmailSignUp';

describe('Email', () => {
  it('Email / Sign up', async () => {
    const EmailSignUpMutation = `
      mutation {
        ${TEST}(
          firstName: "Tony",
          lastName: "Park",
          email: "c3dream@naver.com",
          password: "test",
          profilePhoto: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
          age: 23, 
          phoneNumber: "+16471231234"
        ) {
            ok
            token
            error

        }
      }
    `;

    const emailSignUpResponse = await request(
      `http://127.0.0.1:4000${config.GRAPHQL.GRAPHQL_ENDPOINT}`,
      EmailSignUpMutation
    );
    expect(emailSignUpResponse[TEST].ok).toBeDefined();
    // expect(emailSignUpResponse[TEST].token).not.toBeNull();
  });
});
