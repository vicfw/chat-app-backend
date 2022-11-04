import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app: Application = express();

dotenv.config();
app.use(cors);
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!, () => {
  console.log('Db connected');
});

const server = app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT} !`);
});