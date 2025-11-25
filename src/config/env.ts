import dotenv from 'dotenv';
dotenv.config();

interface Env {
    DB_HOST: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    POSTGRES_PORT: string;
    FRONTEND_URL: string;
    SESSION_SECRET: string;
};

export const env: Env = {
    DB_HOST: process.env.DB_HOST || '1.aws.neon.tech',
    DB_NAME: process.env.DB_NAME || 'neondb',
    DB_USERNAME: process.env.DB_USERNAME || 'neondb_owner',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://',
    SESSION_SECRET: process.env.SESSION_SECRET || '123456ABCDEF',
};