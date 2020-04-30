import { ConnectionOptions } from 'typeorm';
import config from './src/config';

const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: config.DB,
    database: config.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
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
  },
  {
    name: 'test',
    type: config.DB,
    database: config.DATABASE_NAME,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [__dirname + '/src/entities/**/*.ts'],
    // subscribers: [__dirname + '/src/subscribers/**/*.ts'],
    // migrations: [__dirname + '/databases/migrations/**/*.ts'],
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
  },
];

export = connectionOptions;
