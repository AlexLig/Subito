import express from 'express';
import { employeesController } from './employee';
import { employersController } from './employer';
import tux from './tux';
import { Connection, createConnection } from 'typeorm';
import errorHandler from './errorHandlers/errorHandler';

const app = express();

const newConnection = async () => {
  try {
    const connection: Connection = await createConnection();
    return connection;
  } catch (error) {
    console.log(error);
  }
};
newConnection();

app.use(express.json());
app.use('/api/employee', employeesController);
app.use('/api/employer', employersController);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!` + tux));
