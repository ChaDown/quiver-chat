import express from 'express';
import apiRouter from './routes/api';
import passport from 'passport';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './passport';

dotenv.config();

// Set up DB
const mongoDB: string = process.env.DB_KEY;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'https://quiver-chat.onrender.com',
    credentials: true,
    allowedHeaders: 'Cookies',
  })
);
app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(port, () => {
  return console.log(`Express is listening on poer ${port}`);
});
