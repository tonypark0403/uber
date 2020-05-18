// import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import { createConnection, getConnection } from 'typeorm';
import connectionOptions from './ormConfig';

export default async () => {
  let name;
  if (process.env.NODE_ENV === 'test') {
    name = process.env.NODE_ENV;
  } else {
    name = 'default';
  }
  console.log('db connection :', name);
  // const connectionOptions = await getConnectionOptions(name);
  //   console.log('connectionOptions:', connectionOptions);
  // await createConnection({ ...connectionOptions, name: 'default' });
  const connectionOption = connectionOptions.filter((e) => e.name === name);
  await createConnection(connectionOption[0]);
};

export const closeDatabaseConn = async () => {
  getConnection().close();
};
