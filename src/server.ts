import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import registerRouter from './routes/userRoutes';

const app: Application = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', registerRouter);

mongoose.connect(process.env.MONGODB_URI!, () => {});

const server = app.listen(process.env.PORT, function () {});
