import 'reflect-metadata';

import express from 'express';

import Route from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(Route);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
