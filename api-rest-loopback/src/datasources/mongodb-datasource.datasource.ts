import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const config = {
  name: 'MongodbDatasource',
  connector: 'mongodb',
  url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mcg2a7t.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_APPNAME}`,
  host: 'localhost',
  port: 27017,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DB,
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDatasourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongodbDatasource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongodbDatasource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
