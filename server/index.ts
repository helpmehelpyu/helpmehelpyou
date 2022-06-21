import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/dataSource';

dotenv.config({ path: './config/.env' });

const app: Express = express();
const port = process.env.PORT;

AppDataSource.initialize().catch((err) => console.log(err));

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
