import dotenv from 'dotenv';
dotenv.config();
import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import app from './app';
import config from './config';
import connectionOptions from './ormConfig';

const PORT: number | string = config.PORT;
const appOptions: Options = {
  port: PORT,
  playground: config.PLAYGROUND_ENDPOINT,
  endpoint: config.GRAPHQL_ENDPOINT,
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((error: any) => {
    console.log('err:', error);
  });
