import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Link } from '../models/Link';
import { Media } from '../models/Media';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!, 10),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
    entities: ['dist/models/*.js'],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
    logging: true,
});
