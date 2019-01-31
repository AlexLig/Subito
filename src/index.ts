import express from 'express';
import tux from './tux';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!` + tux));
