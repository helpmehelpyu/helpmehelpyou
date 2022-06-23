import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/DataSource';
import mediaRouter from './routes/MediaRouter';

dotenv.config({ path: './config/.env' });

const app: Express = express();
const port = process.env.PORT;

AppDataSource.initialize().catch((err) => console.log(err));

app.use('/media', mediaRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
