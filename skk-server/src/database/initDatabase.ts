import { DataSource, DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import entities from '../typeorm/index';

export async function initDatabase() {
  const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'skk123456',
    database: 'skk',
    synchronize: true,
    entities: entities,
  };

  await createDatabase({
    options,
  });

  const dataSource = new DataSource(options);
  await dataSource.initialize();
}
