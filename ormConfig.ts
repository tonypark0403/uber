import { ConnectionOptions } from 'typeorm';
import config from './src/config';

const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: config.DB.DB,
    database: config.DB.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
    host: config.DB.DB_HOST,
    port: config.DB.DB_PORT,
    username: config.DB.DB_USERNAME,
    password: config.DB.DB_PASSWORD,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  {
    name: 'test',
    type: config.DB.DB,
    database: config.DB.DATABASE_NAME,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [__dirname + '/src/entities/**/*.ts'],
    // subscribers: [__dirname + '/src/subscribers/**/*.ts'],
    // migrations: [__dirname + '/databases/migrations/**/*.ts'],
    host: config.DB.DB_HOST,
    port: config.DB.DB_PORT,
    username: config.DB.DB_USERNAME,
    password: config.DB.DB_PASSWORD,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
];

export = connectionOptions;
