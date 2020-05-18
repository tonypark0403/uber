import dev from './dev';
import prod from './prod';

export interface Config {
  PORT: string | number;
  GRAPHQL: {
    PLAYGROUND_ENDPOINT: string;
    GRAPHQL_ENDPOINT: string;
  };
  DB: {
    DATABASE_NAME: string;
    DB: any;
    DB_HOST: string;
    DB_PORT: number | undefined;
    DB_USERNAME: string;
    DB_PASSWORD: string;
  };
  TESTDB: {
    DATABASE_NAME: string;
    DB: any;
    DB_HOST: string;
    DB_PORT: number | undefined;
    DB_USERNAME: string;
    DB_PASSWORD: string;
  };
  AUTH: {
    BCRYPT_ROUNDS: string | number;
    JWT_SECRET: string;
    TOKEN_COOKIE: string;
  };
  TWILIO: {
    TWILIO_TOKEN: string;
    TWILIO_SID: string;
    TWILIO_PHONE: string;
  };
  MAILGUN: {
    APIKEY: string;
    DOMAIN: string;
  };
  SUBSCRIPTION: {
    SUBSCRIPTION_ENDPOINT: string;
    DRIVERSSUBSCRIPTION: string;
    NEARBYRIDESUBSCRIPTION: string;
    RIDESTATUSSUBSCRIPTION: string;
    MESSAGESUBSCRIPTION: string;
  };
  SUBSCRIPTION_CHANNEL: {
    DRIVERUPDATE: string;
    RIDEREQUEST: string;
    RIDEUPDATE: string;
    NEWCHATMESSAGE: string;
  };
  RIDESTATUS: {
    ACCEPTED: 'ACCEPTED' | 'FINISHED' | 'CANCELED' | 'REQUESTING' | 'ONROUTE';
    FINISHED: 'ACCEPTED' | 'FINISHED' | 'CANCELED' | 'REQUESTING' | 'ONROUTE';
    CANCELED: 'ACCEPTED' | 'FINISHED' | 'CANCELED' | 'REQUESTING' | 'ONROUTE';
    REQUESTING: 'ACCEPTED' | 'FINISHED' | 'CANCELED' | 'REQUESTING' | 'ONROUTE';
    ONROUTE: 'ACCEPTED' | 'FINISHED' | 'CANCELED' | 'REQUESTING' | 'ONROUTE';
  };
}

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
