import * as env from 'dotenv';
import { DataSource } from 'typeorm';

env.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'], 
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
});
