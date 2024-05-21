import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import dancersRouter from './routes/dancers/dancersRoute.js';
import danceEventsRouter from './routes/dance-events/danceEventsRoute.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());
app.use('/dancers', dancersRouter);
app.use('/dance-events', danceEventsRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected through Mongoose');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  return res.status(234).send('Hello from root');
});
