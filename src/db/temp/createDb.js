import db from '../connection.js';
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
        tap_status INTEGER DEFAULT -1,
        tap_f_progress INTEGER DEFAULT 0,
        tap_b_progress INTEGER DEFAULT 0,
        tap_f_record INTEGER DEFAULT 0,
        tap_b_record INTEGER DEFAULT 0,
        tap_f_autorepeat INTEGER DEFAULT 0,
        tap_b_autorepeat INTEGER DEFAULT 0,
        write_status INTEGER DEFAULT 0,
        write_f_progress INTEGER DEFAULT 0,
        write_b_progress INTEGER DEFAULT 0,
        write_f_record INTEGER DEFAULT 0,
        write_b_record INTEGER DEFAULT 0,
        write_f_autorepeat INTEGER DEFAULT 0,
        write_b_autorepeat INTEGER DEFAULT 0,
        word TEXT,
        transcription TEXT,
        translation TEXT,
        example TEXT
    )`;
    db.run(dropMainTable);
    db.run(createMainTable);

    const fillMainTable = `INSERT INTO main_data (
        tap_status,
        tap_f_progress,
        tap_b_progress,
        write_status,
        write_f_progress,
        write_b_progress,
        word,
        transcription,
        translation,
        example
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let stmt = db.prepare(fillMainTable);
    const rawData = await readJson('./source2.json');
    for(let i = 0; i < rawData.length; i++) {
        stmt.run([
            rawData[i][0],
            rawData[i][1],
            rawData[i][2],
            rawData[i][3],
            rawData[i][4],
            rawData[i][5],
            rawData[i][6],
            rawData[i][7],
            rawData[i][8],
            rawData[i][9]
        ]);
    }
    stmt.finalize();
});

db.close();