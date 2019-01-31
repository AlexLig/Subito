import express from 'express';
import mongoose from 'mongoose';
import { employeesController } from './employee';
import tux from './tux';

const app = express();

app.use(express.json());
app.use('/api/employees', employeesController);

mongoose
  .connect(
    'mongodb://localhost/subito',
    {
      useNewUrlParser: true,
    },
  )
  .then(() => console.log('Connected to MongoDb...'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!` + tux));
