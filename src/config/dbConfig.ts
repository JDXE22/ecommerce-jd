import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });

const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, 
  dropSchema: false,
  synchronize: true,
  cache: false,
  logging: false,
  entities: ['dist/**/*.entity.{js, ts}'],
  migrations: ['dist/migrations/*{.js, .ts}']
};
export default registerAs('typeormDB', ()=> config)



export const connectionSource = new DataSource( config as DataSourceOptions)