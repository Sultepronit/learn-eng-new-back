import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(path.resolve(__dirname, 'db.sqlite'), err => {
    err ? console.error('Error opening the db', err)
        : console.log('Connected to the database!');
});

export default db;