import { ConnectionOptions } from 'typeorm';
import config from './config';

const connectionOptions: ConnectionOptions = {
  type: config.DB,
  database: config.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: ['entities/**/*.*'],
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default connectionOptions;
