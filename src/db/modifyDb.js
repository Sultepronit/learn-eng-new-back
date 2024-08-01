import db from './database.js';
import fs from 'fs/promises';

async function readJson(filepath) {
    try {
        const json = await fs.readFile(filepath, 'utf8');
        return JSON.parse(json);
    } catch (err) {
        console.error(err);
    }
}

db.serialize(async () => {
    const dropMainTable = 'DROP TABLE IF EXISTS main_data';
    const createMainTable = `CREATE TABLE main_data (
        id INTEGER PRIMARY KEY,
        repeat_status INTEGER DEFAULT -1,
        f_progress INTEGER DEFAULT 0,
        b_progress INTEGER DEFAULT 0,
        word TEXT,
        transcription TEXT,
        translation TEXT,
        example TEXT
    )`;
    db.run(dropMainTable);
    db.run(createMainTable);

    const fillMainTable = `INSERT INTO main_data
        (word, transcription, translation, example)
        VALUES (?, ?, ?, ?)`;

    const stmt = db.prepare(fillMainTable);
    const rawData = await readJson('./source2.json');
    for(let i = 0; i < 100; i++) {
        stmt.run([rawData[i][6], rawData[i][7], rawData[i][8], rawData[i][9]]);
    }
    
    stmt.finalize();
});

db.close();