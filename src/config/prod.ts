import { Config } from '.';

const config: Config = {
  PORT: Number(process.env.PORT),
  GRAPHQL: {
    PLAYGROUND_ENDPOINT: process.env.PLAYGROUND_ENDPOINT || '',
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT || '',
  },
  DB: {
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DB: process.env.DB || '',
    DB_HOST: process.env.DB_ENDPOINT || '',
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
  },
  TESTDB: {
    DATABASE_NAME: process.env.TEST_DATABASE_NAME || '',
    DB: process.env.TEST_DB || '',
    DB_HOST: process.env.TEST_DB_ENDPOINT || '',
    DB_PORT: Number(process.env.TEST_DB_PORT),
    DB_USERNAME: process.env.TEST_DB_USERNAME || '',
    DB_PASSWORD: process.env.TEST_DB_PASSWORD || '',
  },
  AUTH: {
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUND || 10,
    JWT_SECRET: process.env.JWT_SECRET || '',
    TOKEN_COOKIE: process.env.TOKEN || '',
  },
  TWILIO: {
    TWILIO_TOKEN: process.env.TWILIO_TOKEN || '',
    TWILIO_SID: process.env.TWILIO_TOKEN || '',
    TWILIO_PHONE: process.env.TWILIO_TOKEN || '',
  },
  MAILGUN: {
    APIKEY: process.env.APIKEY || '',
    DOMAIN: process.env.DOMAIN || '',
  },
  SUBSCRIPTION: {
    SUBSCRIPTION_ENDPOINT: process.env.SUBSCRIPTION_ENDPOINT || '',
    DRIVERSSUBSCRIPTION: process.env.DRIVERSSUBSCRIPTION || '',
    NEARBYRIDESUBSCRIPTION: process.env.NEARBYRIDESUBSCRIPTION || '',
    RIDESTATUSSUBSCRIPTION: process.env.RIDESTATUSSUBSCRIPTION || '',
    MESSAGESUBSCRIPTION: process.env.MESSAGESUBSCRIPTION || '',
  },
  SUBSCRIPTION_CHANNEL: {
    DRIVERUPDATE: process.env.DRIVERUPDATE || '',
    RIDEREQUEST: process.env.RIDEREQUEST || '',
    RIDEUPDATE: process.env.RIDEUPDATE || '',
    NEWCHATMESSAGE: process.env.MESSAGEUPDATE || '',
  },
  RIDESTATUS: {
    ACCEPTED: 'ACCEPTED',
    FINISHED: 'FINISHED',
    CANCELED: 'CANCELED',
    REQUESTING: 'REQUESTING',
    ONROUTE: 'ONROUTE',
  },
};

export default config;
