import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!, 10),
    ssl: process.env.POSTGRES_SSL_REQUIRED === 'true',
});

export const query = async (text: string, params: string[] = []) => {
    return await pool.query(text, params);
};
