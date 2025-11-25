import { env } from '../../src/config/env';
import pkg from 'pg';

const { Pool } = pkg;

const dbHost: string = env.DB_HOST;
const dbPort: number = Number(env.POSTGRES_PORT);
const dbUserName: string = env.DB_USERNAME;
const dbPassWord: string = env.DB_PASSWORD;
const dbName: string = env.DB_NAME;

export const pool = new Pool({
    host: dbHost,
    port: dbPort,
    user: dbUserName,
    password: dbPassWord,
    database: dbName,
    ssl: { rejectUnauthorized: false }
});