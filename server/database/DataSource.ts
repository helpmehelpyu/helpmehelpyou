import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
    entities: ['dist/models/*.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
    // logging: true,
});
