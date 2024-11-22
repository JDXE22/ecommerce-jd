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
  synchronize: true,
  dropSchema: true,
  entities: ['dist/**/*.entity{.ts, .js}'],
  migrations: ['dist/migrations/*{.js, .ts}']
};
export default registerAs('typeormDB', ()=> config)

export const connectionSource = new DataSource( config as DataSourceOptions)