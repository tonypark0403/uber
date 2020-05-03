import dotenv from 'dotenv';
dotenv.config();
import { Options } from 'graphql-yoga';
import app from './app';
import config from './config';
import databaseConn from './databaseConn';
import decodeJWT from './utils/decodeJWT';

const PORT: number | string = config.PORT;
const appOptions: Options = {
  port: PORT,
  playground: config.GRAPHQL.PLAYGROUND_ENDPOINT,
  endpoint: config.GRAPHQL.GRAPHQL_ENDPOINT,
  subscriptions: {
    path: config.CHANNEL.SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      // onConnect는 currentUser를 가지고 있는 object 리턴!!!
      // console.log('connectionParams:', connectionParams);
      const token = connectionParams[config.AUTH.TOKEN_COOKIE];
      if (token) {
        const user = await decodeJWT(token);
        // console.log('user from jwt:', user);
        if (user) {
          return {
            currentUser: user,
          };
        }
        throw new Error('Not valid user with the token');
      } else {
        throw new Error('Missing auth token!');
      }
    },
  },
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

const server = async () => {
  try {
    await databaseConn();
    app.start(appOptions, handleAppStart);
  } catch (error) {
    console.log('err:', error);
  }
  return app;
};

export default async () => await server();
