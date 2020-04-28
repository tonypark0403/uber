import { Options } from 'graphql-yoga';
import app from './app';
import config from './config/dev';

const PORT: number | string = config.PORT;
const appOptions: Options = {
  port: PORT,
  playground: config.PLAYGROUND_ENDPOINT,
  endpoint: config.GRAPHQL_ENDPOINT,
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

app.start(appOptions, handleAppStart);
