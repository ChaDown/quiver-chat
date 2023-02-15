import express from 'express';
import apiRouter from '/routes/api';
import passport from 'passport';
import session from 'express-session';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';

const app: express.Application = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
