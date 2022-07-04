import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './database/DataSource';
import mediaRouter from './routes/MediaRouter';
import userRouter from './routes/UserRouter';
import linksRouter from './routes/LinkRouter';
import cloudinary from 'cloudinary';
import cors from 'cors';

dotenv.config({ path: './config/.env' });

const app: Express = express();
const port = process.env.PORT;

AppDataSource.initialize().catch((err) => console.log(err));
cloudinary.v2.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL!],
  })
);

app.use('/media', mediaRouter);
app.use('/users', userRouter);
app.use('/links', linksRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
