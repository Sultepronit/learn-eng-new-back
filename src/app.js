import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/root.js';
import { audioDir } from './app/sdkSynth/findOrCreateRecord.js';

const app = express();

// enable everything for everyone!
app.use(cors());

// app.use(bodyParser.json());
app.use(express.json());

// app.use(routes);
app.use('/node-learn-eng', routes);

export default app;