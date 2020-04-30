import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export default async () => {
  let name = 'default';
  if (process.env.NODE_ENV === 'test') {
    name = process.env.NODE_ENV;
  }
  console.log('db connection :', name);
  const connectionOptions = await getConnectionOptions(name);
  //   console.log('connectionOptions:', connectionOptions);
  await createConnection({ ...connectionOptions, name: 'default' });
};

export const closeDatabaseConn = async () => {
  getConnection().close();
};
