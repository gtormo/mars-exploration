// Modules
import { connect, ConnectOptions, disconnect } from 'mongoose';

// Types
import { IDb } from '../types/db.type';

const getUri = (options: IDb): string => {
  const { username, password, host, port, db } = options;
  return `mongodb://${username}:${password}@${host}:${port}/${db}`;
};

const getOptions = (): ConnectOptions => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  } as ConnectOptions;
};

export const instance = async (connectionConfig: IDb): Promise<void> => {
  try {
    await connect(getUri(connectionConfig), getOptions());

    console.info('Successfully connected to MongoDB server!');
  } catch (error) {
    throw new Error(error);
  }
};

export const killInstance = async (): Promise<void> => {
  await disconnect();
};
