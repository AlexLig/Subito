import express from 'express';
import { employeesController } from './employee';
import tux from './tux';
import { Connection, createConnection } from 'typeorm';
import errorHandler from './errorHandlers/errorHandler';

const app = express();

const newConnection = async () => {
  const connection: Connection = await createConnection();
  return connection;
};

app.use(express.json());
app.use('/api/employees', employeesController);
app.use('/api/employers', employerController);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!` + tux));
