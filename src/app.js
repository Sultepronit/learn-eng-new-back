import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();

// enable everything for everyone!
app.use(cors());

app.use(bodyParser.json());

// app.use(routes);
app.use('/node-learn-eng', routes);

export default app;