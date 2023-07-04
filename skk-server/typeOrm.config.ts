import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import entities from './src/typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'skk123456',
  database: 'skk',
  entities: entities,
  migrations: ['./src/typeorm/migrations/**/*.ts'],
});
