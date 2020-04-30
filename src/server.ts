import dotenv from 'dotenv';
dotenv.config();
import { Options } from 'graphql-yoga';
// import { createConnection } from 'typeorm';
import app from './app';
import config from './config';
// import connectionOptions from './ormConfig';
import databaseConn from './databaseConn';

const PORT: number | string = config.PORT;
const appOptions: Options = {
  port: PORT,
  playground: config.PLAYGROUND_ENDPOINT,
  endpoint: config.GRAPHQL_ENDPOINT,
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
