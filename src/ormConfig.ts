import path from 'path';
import { ConnectionOptions } from 'typeorm';
import config from './config';

const connectionOptions: ConnectionOptions[] = [
  {
    name: 'default',
    type: config.DB.DB,
    database: config.DB.DATABASE_NAME,
    synchronize: true,
    logging: true,
    // entities: ['src/entities/**/*.ts'],
    entities: [path.join(__dirname, 'entities/**/*.[jt]s')],
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
    type: config.TESTDB.DB,
    database: config.TESTDB.DATABASE_NAME,
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [path.join(__dirname, 'entities/**/*.[jt]s')],
    // subscribers: [__dirname + '/src/subscribers/**/*.ts'],
    // migrations: [__dirname + '/databases/migrations/**/*.ts'],
    host: config.TESTDB.DB_HOST,
    port: config.TESTDB.DB_PORT,
    username: config.TESTDB.DB_USERNAME,
    password: config.TESTDB.DB_PASSWORD,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
];
// export = connectionOptions;
export default connectionOptions;
